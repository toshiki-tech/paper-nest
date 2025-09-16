import { Request, Response, NextFunction } from 'express';
import { Tenant, TenantContext, UserRole } from '@/types';
import { getPrismaClient } from '@/utils/database';

// 扩展Request类型以包含租户信息
declare global {
  namespace Express {
    interface Request {
      tenant?: Tenant;
      tenantContext?: TenantContext;
    }
  }
}

// 租户识别中间件
export async function tenantMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const tenantSlug = extractTenantSlug(req);
    
    if (!tenantSlug) {
      return res.status(400).json({
        success: false,
        error: 'Tenant not specified'
      });
    }

    const prisma = getPrismaClient();
    const tenant = await prisma.tenant.findUnique({
      where: { slug: tenantSlug },
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        error: 'Tenant not found'
      });
    }

    if (tenant.status !== 'active') {
      return res.status(403).json({
        success: false,
        error: 'Tenant is not active'
      });
    }

    req.tenant = tenant as Tenant;
    next();
  } catch (error) {
    console.error('Tenant middleware error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

// 从请求中提取租户标识符
function extractTenantSlug(req: Request): string | null {
  // 1. 从子域名提取
  const host = req.get('host') || '';
  const subdomainMatch = host.match(/^([a-zA-Z0-9-]+)\./);
  if (subdomainMatch) {
    return subdomainMatch[1];
  }

  // 2. 从路径参数提取
  if (req.params.tenantSlug) {
    return req.params.tenantSlug;
  }

  // 3. 从查询参数提取
  if (req.query.tenant) {
    return req.query.tenant as string;
  }

  // 4. 从请求头提取
  if (req.headers['x-tenant-slug']) {
    return req.headers['x-tenant-slug'] as string;
  }

  return null;
}

// 租户上下文中间件（需要认证）
export async function tenantContextMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.tenant || !req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    const prisma = getPrismaClient();
    
    // 获取用户在租户中的角色和权限
    const userTenant = await prisma.userTenant.findUnique({
      where: {
        userId_tenantId: {
          userId: req.user.id,
          tenantId: req.tenant.id,
        },
      },
    });

    if (!userTenant || userTenant.status !== 'active') {
      return res.status(403).json({
        success: false,
        error: 'Access denied for this tenant'
      });
    }

    const tenantContext: TenantContext = {
      tenantId: req.tenant.id,
      tenantSlug: req.tenant.slug,
      schema: `tenant_${req.tenant.slug}`,
      userRole: userTenant.role as UserRole,
      permissions: userTenant.permissions ? JSON.parse(userTenant.permissions) : [],
    };

    req.tenantContext = tenantContext;
    next();
  } catch (error) {
    console.error('Tenant context middleware error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

// 权限检查中间件
export function requirePermission(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.tenantContext) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    if (!req.tenantContext.permissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions'
      });
    }

    next();
  };
}

// 角色检查中间件
export function requireRole(roles: UserRole | UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.tenantContext) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!allowedRoles.includes(req.tenantContext.userRole)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient role privileges'
      });
    }

    next();
  };
}

import { create } from 'zustand';
import { Tenant } from '@/types';

interface TenantState {
  currentTenant: Tenant | null;
  isLoading: boolean;
  
  // Actions
  setTenant: (tenant: Tenant) => void;
  clearTenant: () => void;
  setLoading: (loading: boolean) => void;
}

export const useTenantStore = create<TenantState>((set) => ({
  currentTenant: null,
  isLoading: false,

  setTenant: (tenant) => {
    set({
      currentTenant: tenant,
      isLoading: false,
    });
  },

  clearTenant: () => {
    set({
      currentTenant: null,
      isLoading: false,
    });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },
}));

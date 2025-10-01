import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Vulnerability, Company, DashboardFilters, SeverityLevel } from '../types';

interface VaptStore {
  companies: Company[];
  vulnerabilities: Vulnerability[];
  filters: DashboardFilters;
  selectedVulnerability: Vulnerability | null;
  
  setFilters: (filters: Partial<DashboardFilters>) => void;
  setSelectedCompany: (companyId: string | null) => void;
  addCompany: (company: Company) => void;
  updateCompany: (id: string, company: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
  addVulnerability: (vulnerability: Vulnerability) => void;
  updateVulnerability: (id: string, vulnerability: Partial<Vulnerability>) => void;
  deleteVulnerability: (id: string) => void;
  setSelectedVulnerability: (vulnerability: Vulnerability | null) => void;
  getFilteredVulnerabilities: () => Vulnerability[];
}

// Helper function to calculate severity from CVSS score
export const getSeverityFromCVSS = (score: number): SeverityLevel => {
  if (score >= 9.0) return 'Critical';
  if (score >= 7.0) return 'High';
  if (score >= 4.0) return 'Medium';
  return 'Low';
};

export const useVaptStore = create<VaptStore>()(
  persist(
    (set, get) => ({
  companies: [],
  vulnerabilities: [],
  filters: {
    companyId: null,
    severity: 'All',
    status: 'All',
    dateRange: {
      start: null,
      end: null,
    },
    searchQuery: '',
  },
  selectedVulnerability: null,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  setSelectedCompany: (companyId) =>
    set((state) => ({
      filters: { ...state.filters, companyId },
    })),

  addCompany: (company) =>
    set((state) => ({
      companies: [...state.companies, company],
    })),

  updateCompany: (id, updates) =>
    set((state) => ({
      companies: state.companies.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),

  deleteCompany: (id) =>
    set((state) => {
      const newState = {
        companies: state.companies.filter((c) => c.id !== id),
        vulnerabilities: state.vulnerabilities.filter((v) => v.companyId !== id),
        filters: state.filters.companyId === id 
          ? { ...state.filters, companyId: null }
          : state.filters,
      };
      return newState;
    }),

  addVulnerability: (vulnerability) =>
    set((state) => ({
      vulnerabilities: [...state.vulnerabilities, vulnerability],
    })),

  updateVulnerability: (id, updates) =>
    set((state) => ({
      vulnerabilities: state.vulnerabilities.map((v) =>
        v.id === id ? { ...v, ...updates } : v
      ),
    })),

  deleteVulnerability: (id) =>
    set((state) => ({
      vulnerabilities: state.vulnerabilities.filter((v) => v.id !== id),
    })),

  setSelectedVulnerability: (vulnerability) =>
    set({ selectedVulnerability: vulnerability }),

  getFilteredVulnerabilities: () => {
    const { vulnerabilities, filters } = get();
    
    return vulnerabilities.filter((vuln) => {
      // Company filter
      if (filters.companyId && vuln.companyId !== filters.companyId) {
        return false;
      }

      // Severity filter
      if (filters.severity !== 'All' && vuln.severity !== filters.severity) {
        return false;
      }

      // Status filter
      if (filters.status !== 'All' && vuln.status !== filters.status) {
        return false;
      }

      // Date range filter
      if (filters.dateRange.start && vuln.discoveredDate < filters.dateRange.start) {
        return false;
      }
      if (filters.dateRange.end && vuln.discoveredDate > filters.dateRange.end) {
        return false;
      }

      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          vuln.name.toLowerCase().includes(query) ||
          vuln.description.toLowerCase().includes(query) ||
          vuln.targetUrl.toLowerCase().includes(query)
        );
      }

      return true;
    });
  },
    }),
    {
      name: 'vapt-storage',
    }
  )
);

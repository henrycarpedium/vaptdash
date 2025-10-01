export type SeverityLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type VulnerabilityStatus = 'Open' | 'In Progress' | 'Resolved';

export interface PoCStep {
  id: string;
  title: string;
  description: string;
  images: string[];
}

export interface Vulnerability {
  id: string;
  companyId: string;
  name: string;
  description: string;
  impact: string;
  targetUrl: string;
  cvssScore: number;
  severity: SeverityLevel;
  status: VulnerabilityStatus;
  pocSteps: PoCStep[];
  remediation: string;
  discoveredDate: Date;
  resolvedDate?: Date;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
}

export interface DashboardFilters {
  companyId: string | null;
  severity: SeverityLevel | 'All';
  status: VulnerabilityStatus | 'All';
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  searchQuery: string;
}


export type NavView = 'prospects' | 'workflows' | 'settings';

export interface UserProfile {
  name: string;
  workspace: string;
  credits: number;
  initials: string;
}

export interface CompanyInfo {
  name: string;
  logo: string;
  industry: string;
  employeeCount: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface TableRow {
  id: string;
  company: string;
  website: string;
  linkedin: string;
  status: 'Completed' | 'Syncing' | 'Draft';
  buyerRole: string;
  accountAnalysis: string;
  buyerRoleAnalysis: string;
  industryAnalysis: string;
  industry: string;
  size: string;
  location: string;
  signals: string;
}

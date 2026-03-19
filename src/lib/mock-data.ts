// Types and utility functions for the application

export type LeadStatus = 'watching' | 'ghosting' | 'critical' | 'replied' | 'archived';
export type MessageTone = 'warm' | 'firm' | 'final';
export type Channel = 'whatsapp' | 'email' | 'both';
export type PlanTier = 'starter' | 'growth' | 'agency';

export interface Lead {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  business_type: string | null;
  deal_value: number | null;
  notes: string;
  last_contacted: string;
  status: LeadStatus;
  channel: Channel;
  created_at: string;
  score: number;
}

export interface Message {
  id: string;
  lead_id: string;
  lead_name: string;
  user_id: string;
  content: string;
  tone: MessageTone;
  channel: Channel;
  status: 'pending' | 'scheduled' | 'sent' | 'skipped';
  scheduled_at: string;
  sent_at: string | null;
}

export interface UserSettings {
  id: string;
  user_id: string;
  followup1_hours: number;
  followup2_hours: number;
  followup3_days: number;
  tone_progression: MessageTone[];
  preferred_channel: Channel;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  business_name: string;
  business_type: string;
  plan: PlanTier;
  created_at: string;
  status: string;
  avatar_url?: string;
}

// Mock admin data (admin panel still uses mock data)
export const mockCustomers: UserProfile[] = [
  { id: '1', email: 'john@business.com', full_name: 'John Smith', business_name: 'Smith Coaching', business_type: 'Coaching', plan: 'growth', created_at: '2024-01-15', status: 'active' },
  { id: '2', email: 'maria@salon.com', full_name: 'Maria Garcia', business_name: 'Bella Salon', business_type: 'Salon', plan: 'starter', created_at: '2024-01-20', status: 'active' },
  { id: '3', email: 'alex@agency.com', full_name: 'Alex Turner', business_name: 'Turner Digital', business_type: 'Agency', plan: 'agency', created_at: '2024-02-01', status: 'active' },
  { id: '4', email: 'priya@retail.com', full_name: 'Priya Sharma', business_name: 'Priya Boutique', business_type: 'Retail', plan: 'growth', created_at: '2024-02-10', status: 'trial' },
  { id: '5', email: 'mike@freelance.com', full_name: 'Mike Wilson', business_name: 'MW Design', business_type: 'Freelancer', plan: 'starter', created_at: '2023-12-01', status: 'churned' },
];

export const mockAITemplates = [
  { id: '1', name: 'Warm Follow-Up', tone: 'warm' as MessageTone, template: "Hi {{lead_name}}, just checking in to see if you had any more questions about our {{business_type}} services! We'd love to help you get started. No pressure at all — just want to make sure you have everything you need." },
  { id: '2', name: 'Firm Follow-Up', tone: 'firm' as MessageTone, template: "Hi {{lead_name}}, I haven't heard back regarding the {{business_type}} proposal. Should I keep this slot open for you? We have limited availability this month, and I'd hate for you to miss out." },
  { id: '3', name: 'Final Follow-Up', tone: 'final' as MessageTone, template: "Hi {{lead_name}}, I'm going to go ahead and close your inquiry for {{business_type}} for now. Feel free to reach out anytime if things change — we'd love to work with you!" },
];

// Ghosting detection logic
export const checkGhosting = (lastContactedDate: string, thresholdHours: number): boolean => {
  const diff = (Date.now() - new Date(lastContactedDate).getTime()) / (1000 * 60 * 60);
  return diff > thresholdHours;
};

// AI message generation (mocked)
export const generateAIMessage = (leadName: string, businessType: string, tone: MessageTone): string => {
  const templates: Record<MessageTone, string> = {
    warm: `Hi ${leadName}, just checking in to see if you had any more questions about our ${businessType} services! We'd love to help you get started.`,
    firm: `Hi ${leadName}, I haven't heard back regarding the ${businessType} proposal. Should I keep this slot open for you?`,
    final: `Hi ${leadName}, I'm going to go ahead and close your inquiry for ${businessType} for now. Feel free to reach out if things change!`,
  };
  return templates[tone];
};

// Helper to get status badge class
export const getStatusClass = (status: LeadStatus): string => {
  const classes: Record<LeadStatus, string> = {
    watching: 'status-watching',
    ghosting: 'status-ghosting',
    critical: 'status-critical',
    replied: 'status-replied',
    archived: 'status-archived',
  };
  return classes[status];
};

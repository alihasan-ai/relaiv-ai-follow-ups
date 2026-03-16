// Mock data for the application

export type LeadStatus = 'watching' | 'ghosting' | 'critical' | 'replied' | 'archived';
export type MessageTone = 'warm' | 'firm' | 'final';
export type Channel = 'whatsapp' | 'email' | 'both';
export type PlanTier = 'starter' | 'growth' | 'agency';

export interface Lead {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  business_type: string;
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
  status: 'active' | 'trial' | 'churned';
  avatar_url?: string;
}

// Mock leads
export const mockLeads: Lead[] = [
  { id: '1', user_id: '1', name: 'Sarah Chen', email: 'sarah@example.com', phone: '+1234567890', business_type: 'Salon', deal_value: 2500, notes: 'Interested in full package', last_contacted: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), status: 'ghosting', channel: 'email', created_at: '2024-01-15', score: 45 },
  { id: '2', user_id: '1', name: 'Marcus Johnson', email: 'marcus@example.com', phone: '+1234567891', business_type: 'Coaching', deal_value: 5000, notes: 'Follow up on proposal', last_contacted: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), status: 'watching', channel: 'whatsapp', created_at: '2024-01-20', score: 78 },
  { id: '3', user_id: '1', name: 'Emily Rodriguez', email: 'emily@example.com', phone: '+1234567892', business_type: 'Retail', deal_value: 1200, notes: 'Wants to see demo first', last_contacted: new Date(Date.now() - 168 * 60 * 60 * 1000).toISOString(), status: 'critical', channel: 'both', created_at: '2024-01-10', score: 15 },
  { id: '4', user_id: '1', name: 'David Kim', email: 'david@example.com', phone: '+1234567893', business_type: 'Agency', deal_value: 8000, notes: 'Replied with questions', last_contacted: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), status: 'replied', channel: 'email', created_at: '2024-01-25', score: 92 },
  { id: '5', user_id: '1', name: 'Lisa Patel', email: 'lisa@example.com', phone: '+1234567894', business_type: 'Freelancer', deal_value: 3500, notes: 'Checking with partner', last_contacted: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), status: 'ghosting', channel: 'whatsapp', created_at: '2024-02-01', score: 38 },
  { id: '6', user_id: '1', name: 'James Wright', email: 'james@example.com', phone: '+1234567895', business_type: 'Coaching', deal_value: null, notes: '', last_contacted: new Date(Date.now() - 336 * 60 * 60 * 1000).toISOString(), status: 'archived', channel: 'email', created_at: '2023-12-15', score: 5 },
  { id: '7', user_id: '1', name: 'Anna Kowalski', email: 'anna@example.com', phone: '+1234567896', business_type: 'Salon', deal_value: 1800, notes: 'Interested in monthly plan', last_contacted: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(), status: 'critical', channel: 'both', created_at: '2024-02-05', score: 22 },
  { id: '8', user_id: '1', name: 'Tom Nakamura', email: 'tom@example.com', phone: '+1234567897', business_type: 'Retail', deal_value: 4200, notes: 'Wants custom pricing', last_contacted: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), status: 'watching', channel: 'email', created_at: '2024-02-10', score: 65 },
];

// Mock messages
export const mockMessages: Message[] = [
  { id: '1', lead_id: '1', lead_name: 'Sarah Chen', user_id: '1', content: "Hi Sarah, just checking in to see if you had any more questions about our Salon services! We'd love to help you get started.", tone: 'warm', channel: 'email', status: 'pending', scheduled_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), sent_at: null },
  { id: '2', lead_id: '5', lead_name: 'Lisa Patel', user_id: '1', content: "Hi Lisa, I haven't heard back regarding the Freelancer proposal. Should I keep this slot open for you? Happy to answer any questions.", tone: 'firm', channel: 'whatsapp', status: 'pending', scheduled_at: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), sent_at: null },
  { id: '3', lead_id: '3', lead_name: 'Emily Rodriguez', user_id: '1', content: "Hi Emily, I'm going to go ahead and close your inquiry for Retail services for now. Feel free to reach out anytime if things change — we'd love to work with you!", tone: 'final', channel: 'email', status: 'pending', scheduled_at: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), sent_at: null },
  { id: '4', lead_id: '7', lead_name: 'Anna Kowalski', user_id: '1', content: "Hi Anna, just wanted to follow up on the monthly Salon plan we discussed. Is there anything else you need to make a decision?", tone: 'warm', channel: 'both', status: 'scheduled', scheduled_at: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), sent_at: null },
];

// Mock admin data
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

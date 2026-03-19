import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Ghost, TrendingUp, DollarSign, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getStatusClass, type Lead, type LeadStatus } from '@/lib/mock-data';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchLeads = async () => {
      const { data } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setLeads(data as unknown as Lead[]);
      setLoading(false);
    };
    fetchLeads();
  }, [user]);

  const activeCount = leads.filter(l => l.status !== 'archived').length;
  const ghostingCount = leads.filter(l => l.status === 'ghosting').length;
  const recoveredCount = leads.filter(l => l.status === 'replied').length;
  const revenueSaved = leads.filter(l => l.status === 'replied').reduce((sum, l) => sum + (l.deal_value || 0), 0);

  const metrics = [
    { label: 'Active Leads', value: String(activeCount), trend: 'Total active', up: true, icon: Users, color: 'text-primary bg-primary/5' },
    { label: 'Currently Ghosting', value: String(ghostingCount), trend: 'Need attention', up: false, icon: Ghost, color: 'text-ghosting bg-amber-50' },
    { label: 'Recovered', value: String(recoveredCount), trend: 'Replied leads', up: true, icon: TrendingUp, color: 'text-secondary bg-secondary/5' },
    { label: 'Est. Revenue Saved', value: `$${revenueSaved.toLocaleString()}`, trend: 'From recovered', up: true, icon: DollarSign, color: 'text-secondary bg-secondary/5' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your lead recovery overview</p>
        </div>
        <Button onClick={() => navigate('/leads')} size="sm">
          <Plus className="w-4 h-4 mr-1" /> Add Lead
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            className="card-elevated p-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-lg ${m.color} flex items-center justify-center`}>
                <m.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="metric-number text-foreground">{loading ? '—' : m.value}</div>
            <div className="metric-label mt-0.5">{m.label}</div>
            <div className={`flex items-center gap-1 mt-2 ${m.up ? 'metric-trend-up' : 'metric-trend-down'}`}>
              {m.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {m.trend}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="card-elevated">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Recent Leads</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/leads')} className="text-xs">View All</Button>
        </div>
        {loading ? (
          <div className="p-4 space-y-3">
            {[1,2,3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : leads.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground text-sm">No leads yet. Add your first lead to get started!</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate('/leads')}>
              <Plus className="w-4 h-4 mr-1" /> Add Lead
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Name</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden sm:table-cell">Business</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Last Contact</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">Next Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 5).map(lead => (
                  <tr
                    key={lead.id}
                    className="border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors group"
                    onClick={() => navigate(`/leads/${lead.id}`)}
                  >
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-foreground">{lead.name}</div>
                      <div className="text-xs text-muted-foreground">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-sm text-muted-foreground">{lead.business_type}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs text-muted-foreground">
                      {new Date(lead.last_contacted).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wide ${getStatusClass(lead.status as LeadStatus)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">
                      {lead.status === 'ghosting' ? 'Send follow-up' : lead.status === 'critical' ? 'Final attempt' : 'Monitor'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

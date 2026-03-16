import { motion } from 'framer-motion';
import { Users, Ghost, TrendingUp, DollarSign, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { mockLeads, getStatusClass } from '@/lib/mock-data';

const metrics = [
  { label: 'Active Leads', value: '24', trend: '+3 this week', up: true, icon: Users, color: 'text-primary bg-primary/5' },
  { label: 'Currently Ghosting', value: '7', trend: '+2 since yesterday', up: false, icon: Ghost, color: 'text-ghosting bg-amber-50' },
  { label: 'Recovered This Month', value: '12', trend: '+18% vs last month', up: true, icon: TrendingUp, color: 'text-secondary bg-secondary/5' },
  { label: 'Est. Revenue Saved', value: '$8,400', trend: '+$1,200 this week', up: true, icon: DollarSign, color: 'text-secondary bg-secondary/5' },
];

const Dashboard = () => {
  const navigate = useNavigate();

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
            <div className="metric-number text-foreground">{m.value}</div>
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
              {mockLeads.slice(0, 5).map(lead => (
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
                    <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wide ${getStatusClass(lead.status)}`}>
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
      </div>
    </div>
  );
};

export default Dashboard;

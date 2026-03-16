import { mockCustomers } from '@/lib/mock-data';
import { Users, DollarSign, TrendingDown, MessageSquare, Database, CheckCircle } from 'lucide-react';

const metrics = [
  { label: 'Total MRR', value: '$4,720', icon: DollarSign, color: 'text-green-400 bg-green-400/10' },
  { label: 'Active Customers', value: '47', icon: Users, color: 'text-blue-400 bg-blue-400/10' },
  { label: 'Churn This Month', value: '3', icon: TrendingDown, color: 'text-red-400 bg-red-400/10' },
  { label: 'Messages Sent', value: '2,847', icon: MessageSquare, color: 'text-purple-400 bg-purple-400/10' },
  { label: 'Total Leads', value: '1,234', icon: Database, color: 'text-teal-400 bg-teal-400/10' },
  { label: 'System Status', value: 'Healthy', icon: CheckCircle, color: 'text-green-400 bg-green-400/10' },
];

const AdminDashboard = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Platform Overview</h1>
        <p className="text-sm text-slate-400">Real-time platform health and metrics</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {metrics.map((m, i) => (
          <div key={i} className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <div className={`w-8 h-8 rounded-lg ${m.color} flex items-center justify-center mb-3`}>
              <m.icon className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold tabular-nums">{m.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Signups */}
      <div className="bg-slate-900 rounded-xl border border-slate-800">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-sm font-semibold">Recent Signups</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Name</th>
                <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Business</th>
                <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Plan</th>
                <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.slice(0, 5).map(c => (
                <tr key={c.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="px-4 py-3 text-sm">{c.full_name}</td>
                  <td className="px-4 py-3 text-sm text-slate-400">{c.business_name}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold uppercase px-2 py-0.5 rounded ${
                      c.plan === 'agency' ? 'bg-purple-500/10 text-purple-400' :
                      c.plan === 'growth' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-slate-700 text-slate-300'
                    }`}>{c.plan}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const mrrData = [
  { month: 'Jan', mrr: 2800 }, { month: 'Feb', mrr: 3200 }, { month: 'Mar', mrr: 3600 },
  { month: 'Apr', mrr: 3900 }, { month: 'May', mrr: 4200 }, { month: 'Jun', mrr: 4720 },
];

const signupData = [
  { week: 'W1', signups: 4 }, { week: 'W2', signups: 6 }, { week: 'W3', signups: 3 },
  { week: 'W4', signups: 8 }, { week: 'W5', signups: 5 }, { week: 'W6', signups: 7 },
];

const planData = [
  { name: 'Starter', value: 18, color: '#94a3b8' },
  { name: 'Growth', value: 22, color: '#3b82f6' },
  { name: 'Agency', value: 7, color: '#a855f7' },
];

const churnData = [
  { month: 'Jan', rate: 5.2 }, { month: 'Feb', rate: 4.8 }, { month: 'Mar', rate: 3.9 },
  { month: 'Apr', rate: 4.1 }, { month: 'May', rate: 3.5 }, { month: 'Jun', rate: 3.2 },
];

const AdminAnalytics = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Revenue & Analytics</h1>
        <p className="text-sm text-slate-400">Platform-wide performance metrics</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <h3 className="text-sm font-semibold mb-4">MRR Over Time</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={mrrData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', color: '#f1f5f9' }} />
              <Line type="monotone" dataKey="mrr" stroke="#a855f7" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <h3 className="text-sm font-semibold mb-4">New Signups Per Week</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={signupData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', color: '#f1f5f9' }} />
              <Bar dataKey="signups" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <h3 className="text-sm font-semibold mb-4">Plan Distribution</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={planData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={2}>
                {planData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', color: '#f1f5f9' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {planData.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                <span className="text-slate-400">{p.name} ({p.value})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <h3 className="text-sm font-semibold mb-4">Churn Rate Over Time</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={churnData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} unit="%" />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', color: '#f1f5f9' }} />
              <Line type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;

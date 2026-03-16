import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const recoveryData = [
  { month: 'Jan', rate: 32 }, { month: 'Feb', rate: 38 }, { month: 'Mar', rate: 42 },
  { month: 'Apr', rate: 47 }, { month: 'May', rate: 44 }, { month: 'Jun', rate: 52 },
];

const statusData = [
  { name: 'Watching', value: 8, color: 'hsl(217, 91%, 60%)' },
  { name: 'Ghosting', value: 7, color: 'hsl(38, 92%, 50%)' },
  { name: 'Critical', value: 3, color: 'hsl(0, 84%, 60%)' },
  { name: 'Replied', value: 12, color: 'hsl(161, 69%, 37%)' },
  { name: 'Archived', value: 4, color: 'hsl(220, 9%, 46%)' },
];

const toneData = [
  { tone: 'Warm', responses: 28 }, { tone: 'Firm', responses: 18 }, { tone: 'Final', responses: 8 },
];

const Analytics = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">Track your lead recovery performance</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Recovery Rate', value: '47%', sub: '+5% vs last month' },
          { label: 'Revenue Recovered', value: '$8,400', sub: 'vs $6,200 last month' },
          { label: 'Avg Days to Recovery', value: '3.2', sub: '-0.5 days improvement' },
          { label: 'Messages Sent', value: '156', sub: 'This month' },
        ].map((m, i) => (
          <div key={i} className="card-elevated p-5">
            <div className="metric-number text-foreground">{m.value}</div>
            <div className="metric-label mt-0.5">{m.label}</div>
            <div className="metric-trend-up mt-1">{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recovery Rate */}
        <div className="card-elevated p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recovery Rate Over Time</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={recoveryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="hsl(245, 43%, 51%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status Breakdown */}
        <div className="card-elevated p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Leads by Status</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={2}>
                {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {statusData.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-muted-foreground">{s.name} ({s.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Tone */}
        <div className="card-elevated p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Best Performing Message Tone</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={toneData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="tone" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <Tooltip />
              <Bar dataKey="responses" fill="hsl(161, 69%, 37%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Comparison */}
        <div className="card-elevated p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Revenue Recovered</h3>
          <div className="flex items-end gap-8 justify-center h-[200px]">
            <div className="text-center">
              <div className="h-24 w-16 bg-muted rounded-t-lg flex items-end justify-center pb-2">
                <span className="text-xs font-semibold text-muted-foreground">$6.2K</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Last Month</p>
            </div>
            <div className="text-center">
              <div className="h-36 w-16 bg-primary rounded-t-lg flex items-end justify-center pb-2">
                <span className="text-xs font-semibold text-primary-foreground">$8.4K</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">This Month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

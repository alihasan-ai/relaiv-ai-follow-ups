const logs = [
  { event: 'Message Sent', customer: 'John Smith', time: '2 min ago', status: 'success' },
  { event: 'AI Call', customer: 'Maria Garcia', time: '5 min ago', status: 'success' },
  { event: 'Login', customer: 'Alex Turner', time: '12 min ago', status: 'success' },
  { event: 'Message Sent', customer: 'Priya Sharma', time: '18 min ago', status: 'success' },
  { event: 'Error', customer: 'System', time: '25 min ago', status: 'error' },
  { event: 'Login', customer: 'John Smith', time: '1 hour ago', status: 'success' },
  { event: 'AI Call', customer: 'Alex Turner', time: '1 hour ago', status: 'success' },
  { event: 'Message Sent', customer: 'Maria Garcia', time: '2 hours ago', status: 'success' },
  { event: 'Signup', customer: 'New User', time: '3 hours ago', status: 'success' },
  { event: 'Error', customer: 'System', time: '4 hours ago', status: 'error' },
];

const SystemLogs = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">System Logs</h1>
        <p className="text-sm text-slate-400">Recent platform activity</p>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Event</th>
              <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Customer</th>
              <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Time</th>
              <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                <td className="px-4 py-3 text-sm">{log.event}</td>
                <td className="px-4 py-3 text-sm text-slate-400">{log.customer}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{log.time}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    log.status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                  }`}>{log.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SystemLogs;

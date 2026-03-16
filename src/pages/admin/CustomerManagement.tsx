import { mockCustomers } from '@/lib/mock-data';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const CustomerManagement = () => {
  const [selected, setSelected] = useState<typeof mockCustomers[0] | null>(null);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <p className="text-sm text-slate-400">{mockCustomers.length} registered customers</p>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                {['Name', 'Business', 'Plan', 'Signup', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-slate-400 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map(c => (
                <tr key={c.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 cursor-pointer" onClick={() => setSelected(c)}>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium">{c.full_name}</div>
                    <div className="text-xs text-slate-500">{c.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">{c.business_name}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold uppercase px-2 py-0.5 rounded ${
                      c.plan === 'agency' ? 'bg-purple-500/10 text-purple-400' :
                      c.plan === 'growth' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-slate-700 text-slate-300'
                    }`}>{c.plan}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{new Date(c.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      c.status === 'active' ? 'bg-green-500/10 text-green-400' :
                      c.status === 'trial' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent className="bg-slate-900 border-slate-800 text-slate-100">
          <SheetHeader>
            <SheetTitle className="text-slate-100">{selected?.full_name}</SheetTitle>
          </SheetHeader>
          {selected && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs text-slate-400">Email</span><p className="text-sm">{selected.email}</p></div>
                <div><span className="text-xs text-slate-400">Business</span><p className="text-sm">{selected.business_name}</p></div>
                <div><span className="text-xs text-slate-400">Plan</span><p className="text-sm capitalize">{selected.plan}</p></div>
                <div><span className="text-xs text-slate-400">Status</span><p className="text-sm capitalize">{selected.status}</p></div>
                <div><span className="text-xs text-slate-400">Leads</span><p className="text-sm">24</p></div>
                <div><span className="text-xs text-slate-400">Messages Sent</span><p className="text-sm">156</p></div>
                <div><span className="text-xs text-slate-400">Recovery Rate</span><p className="text-sm">47%</p></div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">Upgrade</Button>
                <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">Downgrade</Button>
                <Button size="sm" variant="destructive">Suspend</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CustomerManagement;

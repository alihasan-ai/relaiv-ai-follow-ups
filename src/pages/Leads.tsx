import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getStatusClass, type LeadStatus, type Lead } from '@/lib/mock-data';
import { Plus, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

const statusFilters: (LeadStatus | 'all')[] = ['all', 'watching', 'ghosting', 'critical', 'replied', 'archived'];

const Leads = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [showAdd, setShowAdd] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [newLead, setNewLead] = useState({
    name: '', email: '', phone: '', business_type: '', deal_value: '', notes: '', last_contacted: '', channel: 'email',
  });

  const fetchLeads = async () => {
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (data) setLeads(data as unknown as Lead[]);
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchLeads();
  }, [user]);

  const filtered = leads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || (l.email || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    const { error } = await supabase.from('leads').insert({
      user_id: user.id,
      name: newLead.name,
      email: newLead.email || null,
      phone: newLead.phone || null,
      business_type: newLead.business_type || null,
      deal_value: newLead.deal_value ? Number(newLead.deal_value) : null,
      notes: newLead.notes,
      last_contacted: newLead.last_contacted || new Date().toISOString(),
      channel: newLead.channel as any,
    });
    setSubmitting(false);
    if (error) {
      toast.error('Failed to add lead');
    } else {
      toast.success('Lead added!');
      setShowAdd(false);
      setNewLead({ name: '', email: '', phone: '', business_type: '', deal_value: '', notes: '', last_contacted: '', channel: 'email' });
      fetchLeads();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads</h1>
          <p className="text-sm text-muted-foreground">{leads.length} total leads</p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)}>
          <Plus className="w-4 h-4 mr-1" /> Add Lead
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads..." className="pl-9" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {statusFilters.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card-elevated overflow-hidden">
        {loading ? (
          <div className="p-4 space-y-3">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground text-sm">No leads found.</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={() => setShowAdd(true)}>
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
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Deal Value</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Last Contact</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">Channel</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(lead => (
                  <tr
                    key={lead.id}
                    className="border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors"
                    onClick={() => navigate(`/leads/${lead.id}`)}
                  >
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-foreground">{lead.name}</div>
                      <div className="text-xs text-muted-foreground">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-sm text-muted-foreground">{lead.business_type}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-sm text-muted-foreground">
                      {lead.deal_value ? `$${Number(lead.deal_value).toLocaleString()}` : '—'}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs text-muted-foreground">
                      {new Date(lead.last_contacted).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wide ${getStatusClass(lead.status as LeadStatus)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground capitalize">{lead.channel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Lead Sheet */}
      <Sheet open={showAdd} onOpenChange={setShowAdd}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New Lead</SheetTitle>
          </SheetHeader>
          <form className="space-y-4 mt-6" onSubmit={handleAddLead}>
            <div className="space-y-2">
              <Label className="text-xs">Full Name</Label>
              <Input value={newLead.name} onChange={e => setNewLead(l => ({ ...l, name: e.target.value }))} placeholder="Sarah Chen" required />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Email</Label>
              <Input type="email" value={newLead.email} onChange={e => setNewLead(l => ({ ...l, email: e.target.value }))} placeholder="sarah@example.com" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Phone</Label>
              <Input value={newLead.phone} onChange={e => setNewLead(l => ({ ...l, phone: e.target.value }))} placeholder="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Business Type</Label>
              <Select value={newLead.business_type} onValueChange={v => setNewLead(l => ({ ...l, business_type: v }))}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  {['Salon', 'Coaching', 'Retail', 'Agency', 'Freelancer', 'Other'].map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Deal Value (optional)</Label>
              <Input type="number" value={newLead.deal_value} onChange={e => setNewLead(l => ({ ...l, deal_value: e.target.value }))} placeholder="5000" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Notes</Label>
              <Textarea value={newLead.notes} onChange={e => setNewLead(l => ({ ...l, notes: e.target.value }))} placeholder="Any context about this lead..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Last Contacted</Label>
              <Input type="date" value={newLead.last_contacted} onChange={e => setNewLead(l => ({ ...l, last_contacted: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Preferred Channel</Label>
              <Select value={newLead.channel} onValueChange={v => setNewLead(l => ({ ...l, channel: v }))}>
                <SelectTrigger><SelectValue placeholder="Select channel" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Adding...' : 'Add Lead'}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Leads;

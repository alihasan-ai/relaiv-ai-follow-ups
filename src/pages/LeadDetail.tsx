import { useParams, useNavigate } from 'react-router-dom';
import { mockLeads, mockMessages, getStatusClass, generateAIMessage } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, MessageSquare, Send, Edit2, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lead = mockLeads.find(l => l.id === id);
  const messages = mockMessages.filter(m => m.lead_id === id);
  const [manualMsg, setManualMsg] = useState('');

  if (!lead) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Lead not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/leads')}>Back to Leads</Button>
      </div>
    );
  }

  const timeline = [
    { type: 'status', content: `Lead created`, time: lead.created_at, icon: '🟢' },
    ...messages.map(m => ({ type: 'message', content: m.content, time: m.scheduled_at, icon: m.channel === 'email' ? '📧' : '💬', tone: m.tone, status: m.status })),
    { type: 'status', content: `Status changed to ${lead.status}`, time: lead.last_contacted, icon: '🔄' },
  ].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button variant="ghost" size="sm" onClick={() => navigate('/leads')} className="mb-4 text-muted-foreground">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Leads
      </Button>

      {/* Header */}
      <div className="card-elevated p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-bold text-foreground">{lead.name}</h1>
              <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wide ${getStatusClass(lead.status)}`}>
                {lead.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {lead.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.phone}</span>
              <span>{lead.business_type}</span>
              {lead.deal_value && <span className="font-medium text-foreground">${lead.deal_value.toLocaleString()}</span>}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Edit2 className="w-3.5 h-3.5 mr-1" /> Edit</Button>
          </div>
        </div>
        {/* Score */}
        <div className="mt-4 flex items-center gap-4">
          <div>
            <span className="text-xs text-muted-foreground">Lead Score</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${lead.score}%` }} />
              </div>
              <span className="text-sm font-semibold text-foreground">{lead.score}</span>
            </div>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Channel</span>
            <p className="text-sm text-foreground capitalize mt-1">{lead.channel}</p>
          </div>
        </div>
        {lead.notes && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <span className="text-xs text-muted-foreground">Notes</span>
            <p className="text-sm text-foreground mt-0.5">{lead.notes}</p>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="card-elevated p-6 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">Interaction Timeline</h2>
        <div className="space-y-4">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-3">
              <div className="text-lg">{item.icon}</div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{item.content}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {new Date(item.time).toLocaleString()}
                  {'tone' in item && <span className="ml-2 text-primary">· {item.tone} tone</span>}
                  {'status' in item && typeof item.status === 'string' && item.type === 'message' && <span className="ml-2">· {item.status}</span>}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Message */}
      <div className="card-elevated p-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">Send Manual Message</h2>
        <Textarea value={manualMsg} onChange={e => setManualMsg(e.target.value)} placeholder="Type your message..." rows={3} className="mb-3" />
        <div className="flex gap-2">
          <Button size="sm" onClick={() => { toast.success('Message queued!'); setManualMsg(''); }}>
            <Send className="w-3.5 h-3.5 mr-1" /> Queue Message
          </Button>
          <Button variant="outline" size="sm" onClick={() => setManualMsg(generateAIMessage(lead.name, lead.business_type, 'warm'))}>
            Generate AI Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;

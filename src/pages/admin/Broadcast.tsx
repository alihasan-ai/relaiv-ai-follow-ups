import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

const Broadcast = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState('all');

  const handleSend = () => {
    if (!subject || !body) { toast.error('Please fill in all fields'); return; }
    toast.success(`Broadcast sent to ${audience === 'all' ? 'all customers' : `${audience} plan customers`}!`);
    setSubject('');
    setBody('');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Broadcast</h1>
        <p className="text-sm text-slate-400">Send announcements to your customers</p>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs text-slate-300">Target Audience</Label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="starter">Starter Plan</SelectItem>
                <SelectItem value="growth">Growth Plan</SelectItem>
                <SelectItem value="agency">Agency Plan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-slate-300">Subject Line</Label>
            <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Exciting update from Relaiv!" className="bg-slate-800 border-slate-700 text-slate-200" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-slate-300">Message Body</Label>
            <Textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Write your announcement..." rows={6} className="bg-slate-800 border-slate-700 text-slate-200" />
          </div>
          <Button onClick={handleSend}>
            <Send className="w-4 h-4 mr-1" /> Send Broadcast
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Broadcast;

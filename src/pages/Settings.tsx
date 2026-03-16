import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

const Settings = () => {
  const [f1, setF1] = useState(24);
  const [f2, setF2] = useState(48);
  const [f3, setF3] = useState(5);
  const [channel, setChannel] = useState('both');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [dailySummary, setDailySummary] = useState(true);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure your follow-up preferences</p>
      </div>

      {/* Follow-up Timing */}
      <div className="card-elevated p-6 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">Follow-Up Sequence</h2>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs">Follow-up 1 (Warm)</Label>
              <span className="text-sm font-semibold text-primary">{f1} hours</span>
            </div>
            <Slider value={[f1]} onValueChange={v => setF1(v[0])} min={6} max={72} step={6} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs">Follow-up 2 (Firm)</Label>
              <span className="text-sm font-semibold text-primary">{f2} hours</span>
            </div>
            <Slider value={[f2]} onValueChange={v => setF2(v[0])} min={12} max={168} step={6} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs">Follow-up 3 (Final)</Label>
              <span className="text-sm font-semibold text-primary">{f3} days</span>
            </div>
            <Slider value={[f3]} onValueChange={v => setF3(v[0])} min={1} max={14} step={1} />
          </div>
        </div>
      </div>

      {/* Tone */}
      <div className="card-elevated p-6 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">Tone Progression</h2>
        <div className="flex gap-3">
          {['Warm', 'Firm', 'Final'].map((t, i) => (
            <div key={t} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                i === 0 ? 'bg-secondary/10 text-secondary' : i === 1 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
              }`}>{i + 1}</div>
              <span className="text-sm text-foreground">{t}</span>
              {i < 2 && <span className="text-muted-foreground">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Channel */}
      <div className="card-elevated p-6 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">Preferred Channel</h2>
        <Select value={channel} onValueChange={setChannel}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
            <SelectItem value="both">Both</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Business Profile */}
      <div className="card-elevated p-6 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">Business Profile</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs">Business Name</Label>
            <Input defaultValue="Demo Business" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Business Type</Label>
            <Select defaultValue="Coaching">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {['Salon', 'Coaching', 'Retail', 'Agency', 'Freelancer', 'Other'].map(t => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card-elevated p-6 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm">Email alerts on reply</Label>
              <p className="text-xs text-muted-foreground">Get notified when a lead responds</p>
            </div>
            <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm">Daily summary</Label>
              <p className="text-xs text-muted-foreground">Receive a daily digest of activity</p>
            </div>
            <Switch checked={dailySummary} onCheckedChange={setDailySummary} />
          </div>
        </div>
      </div>

      <Button onClick={() => toast.success('Settings saved!')} className="w-full sm:w-auto">
        Save Preferences
      </Button>
    </div>
  );
};

export default Settings;

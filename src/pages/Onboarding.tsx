import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, Clock, Mail, Check } from 'lucide-react';

const steps = [
  { title: 'Add your first lead', desc: 'Let\'s add someone you\'d like to follow up with.', icon: User },
  { title: 'Set follow-up timing', desc: 'When should we step in if they go quiet?', icon: Clock },
  { title: 'Connect your email', desc: 'Where should we send messages from?', icon: Mail },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [lead, setLead] = useState({ name: '', email: '' });
  const [timing, setTiming] = useState(48);
  const navigate = useNavigate();

  const next = () => {
    if (step === 0 && !lead.name) { toast.error('Please enter a lead name'); return; }
    if (step < 2) setStep(s => s + 1);
    else {
      toast.success('You\'re all set! Welcome to Relaiv.');
      navigate('/dashboard');
    }
  };

  const StepIcon = steps[step].icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 w-12 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-border'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-4">
                <StepIcon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">{steps[step].title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{steps[step].desc}</p>
            </div>

            <div className="card-elevated p-6">
              {step === 0 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Lead Name</Label>
                    <Input value={lead.name} onChange={e => setLead(l => ({ ...l, name: e.target.value }))} placeholder="Sarah Chen" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Email (optional)</Label>
                    <Input type="email" value={lead.email} onChange={e => setLead(l => ({ ...l, email: e.target.value }))} placeholder="sarah@example.com" />
                  </div>
                </div>
              )}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-xs">Follow up after</Label>
                      <span className="text-sm font-semibold text-primary">{timing} hours</span>
                    </div>
                    <Slider value={[timing]} onValueChange={v => setTiming(v[0])} min={12} max={168} step={12} />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>12h</span>
                      <span>7 days</span>
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-secondary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Email integration coming soon. You can skip this for now and configure it later in Settings.</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8">
          <Button variant="ghost" onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/dashboard')} className="text-sm">
            {step > 0 ? <><ArrowLeft className="w-4 h-4 mr-1" /> Back</> : 'Skip'}
          </Button>
          <Button onClick={next} className="text-sm">
            {step === 2 ? 'Finish Setup' : 'Continue'} <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

const plans = [
  { name: 'Starter', price: 29, leads: '100', messages: '500', features: ['AI follow-ups', 'Email channel', 'Basic analytics', 'Email support'] },
  { name: 'Growth', price: 59, leads: '500', messages: '2,500', features: ['Everything in Starter', 'WhatsApp channel', 'Advanced analytics', 'Priority support'], current: true },
  { name: 'Agency', price: 99, leads: 'Unlimited', messages: 'Unlimited', features: ['Everything in Growth', 'Multi-brand support', 'Custom templates', 'Dedicated support'] },
];

const Billing = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Billing</h1>
        <p className="text-sm text-muted-foreground">Manage your subscription</p>
      </div>

      {/* Current Plan */}
      <div className="card-elevated p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Current Plan</h2>
            <p className="text-2xl font-bold text-primary mt-1">Growth — $59/month</p>
            <p className="text-xs text-muted-foreground mt-1">Next billing date: March 15, 2024</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Usage this month</div>
            <p className="text-sm text-foreground mt-1">Leads: <strong>24 / 500</strong></p>
            <p className="text-sm text-foreground">Messages: <strong>156 / 2,500</strong></p>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <div key={i} className={`card-elevated p-6 ${plan.current ? 'ring-2 ring-primary' : ''}`}>
            {plan.current && (
              <div className="text-xs font-semibold text-primary mb-2">Current Plan</div>
            )}
            <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mt-1 mb-1">
              <span className="text-3xl font-bold text-foreground">${plan.price}</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">{plan.leads} leads · {plan.messages} messages</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-secondary" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.current ? 'outline' : 'default'}
              className="w-full"
              disabled={plan.current}
              onClick={() => toast.success(`Upgraded to ${plan.name}!`)}
            >
              {plan.current ? 'Current Plan' : 'Upgrade'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Billing;

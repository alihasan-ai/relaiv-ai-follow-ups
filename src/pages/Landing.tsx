import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, TrendingUp, Check } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } }),
};

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">R</span>
            </div>
            <span className="font-bold text-lg text-foreground">Relaiv</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Log in</Button>
            <Button size="sm" onClick={() => navigate('/signup')}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-medium mb-8">
              <Zap className="w-3.5 h-3.5" />
              AI-Powered Lead Recovery
            </div>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-tight tracking-tight text-balance mb-6"
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
          >
            Stop chasing.{' '}
            <span className="text-secondary">Start converting.</span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
          >
            Relaiv automatically follows up with leads that have gone quiet, using AI-written personalized messages via email and WhatsApp. Never lose a deal to silence again.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" initial="hidden" animate="visible" variants={fadeUp} custom={3}>
            <Button variant="hero" size="lg" onClick={() => navigate('/signup')} className="px-8 h-12">
              Start Free Trial
            </Button>
            <Button variant="hero-outline" size="lg" onClick={() => navigate('#features')} className="px-8 h-12">
              See How It Works
            </Button>
          </motion.div>
          <motion.p className="mt-4 text-xs text-muted-foreground" initial="hidden" animate="visible" variants={fadeUp} custom={4}>
            No credit card required · 14-day free trial
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8 card-elevated p-8">
            {[
              { value: '47%', label: 'Average recovery rate' },
              { value: '2.3x', label: 'More responses vs manual' },
              { value: '$12K', label: 'Avg revenue saved/month' },
            ].map((stat, i) => (
              <motion.div key={i} className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl font-bold text-foreground mb-4">Everything you need to recover lost deals</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Intelligent automation that feels personal. No more spreadsheets, no more forgotten follow-ups.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'AI Follow-Ups', desc: 'Automatically craft personalized messages based on lead context, business type, and conversation history.', color: 'text-primary bg-primary/5' },
              { icon: Eye, title: 'Ghosting Detection', desc: 'Smart algorithms detect when leads go quiet and trigger the right follow-up at the right time.', color: 'text-ghosting bg-amber-50' },
              { icon: TrendingUp, title: 'Recovery Analytics', desc: 'Track recovery rates, revenue saved, and message performance with real-time dashboards.', color: 'text-secondary bg-secondary/5' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="card-elevated p-6 group hover:shadow-lg transition-shadow"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              >
                <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-card">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl font-bold text-foreground mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground">Start free, upgrade when you're ready.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: 29, leads: '100', messages: '500', features: ['AI follow-ups', 'Email channel', 'Basic analytics', 'Email support'] },
              { name: 'Growth', price: 59, leads: '500', messages: '2,500', features: ['Everything in Starter', 'WhatsApp channel', 'Advanced analytics', 'Priority support'], popular: true },
              { name: 'Agency', price: 99, leads: 'Unlimited', messages: 'Unlimited', features: ['Everything in Growth', 'Multi-brand support', 'Custom templates', 'Dedicated support'] },
            ].map((plan, i) => (
              <motion.div
                key={i}
                className={`rounded-xl p-6 ${plan.popular ? 'bg-primary text-primary-foreground ring-2 ring-primary shadow-lg relative' : 'card-elevated'}`}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>/month</span>
                </div>
                <p className={`text-xs mb-6 ${plan.popular ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {plan.leads} leads · {plan.messages} messages
                </p>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Check className={`w-4 h-4 ${plan.popular ? 'text-secondary' : 'text-secondary'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? 'hero-outline' : 'default'}
                  className={`w-full ${plan.popular ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0' : ''}`}
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to stop losing leads?</h2>
            <p className="text-muted-foreground mb-8">Join hundreds of small businesses recovering revenue on autopilot.</p>
            <Button variant="hero" size="lg" className="px-10 h-12" onClick={() => navigate('/signup')}>
              Start Your Free Trial
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-[10px]">R</span>
            </div>
            <span className="font-semibold text-sm text-foreground">Relaiv</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-xs text-muted-foreground">© 2024 Relaiv. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

import { mockMessages } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Check, Edit2, SkipForward, Mail, MessageSquare, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const MessageQueue = () => {
  const [messages, setMessages] = useState(mockMessages);

  const handleAction = (id: string, action: 'approve' | 'skip') => {
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, status: action === 'approve' ? 'scheduled' : 'skipped' } : m));
    toast.success(action === 'approve' ? 'Message approved and scheduled' : 'Message skipped');
  };

  const pending = messages.filter(m => m.status === 'pending');
  const scheduled = messages.filter(m => m.status === 'scheduled');

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Message Queue</h1>
        <p className="text-sm text-muted-foreground">{pending.length} pending, {scheduled.length} scheduled</p>
      </div>

      {/* Pending */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-foreground mb-3">Pending Approval</h2>
        {pending.length === 0 ? (
          <div className="card-elevated p-12 text-center">
            <p className="text-muted-foreground text-sm">No pending messages. High five! 🙌</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {pending.map(msg => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.2 }}
                  className="card-elevated p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm font-medium text-foreground">{msg.lead_name}</span>
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          msg.tone === 'warm' ? 'bg-secondary/10 text-secondary' :
                          msg.tone === 'firm' ? 'bg-amber-50 text-amber-700' :
                          'bg-red-50 text-red-700'
                        }`}>
                          {msg.tone}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          {msg.channel === 'email' ? <Mail className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
                          {msg.channel}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{msg.content}</p>
                      <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        Scheduled for {new Date(msg.scheduled_at).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" variant="success" onClick={() => handleAction(msg.id, 'approve')}>
                        <Check className="w-3.5 h-3.5 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => toast.info('Edit coming soon')}>
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleAction(msg.id, 'skip')}>
                        <SkipForward className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Scheduled */}
      {scheduled.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Scheduled</h2>
          <div className="space-y-2">
            {scheduled.map(msg => (
              <div key={msg.id} className="card-flat p-4 opacity-70">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-secondary" />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">{msg.lead_name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{msg.tone} · {msg.channel}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(msg.scheduled_at).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageQueue;

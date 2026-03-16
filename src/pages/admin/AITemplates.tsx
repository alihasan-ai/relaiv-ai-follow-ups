import { useState } from 'react';
import { mockAITemplates } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const AITemplates = () => {
  const [templates, setTemplates] = useState(mockAITemplates);

  const updateTemplate = (id: string, content: string) => {
    setTemplates(ts => ts.map(t => t.id === id ? { ...t, template: content } : t));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">AI Template Manager</h1>
        <p className="text-sm text-slate-400">Edit the AI prompt templates for follow-up messages</p>
      </div>

      <div className="space-y-6">
        {templates.map(t => (
          <div key={t.id} className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-semibold uppercase px-2 py-0.5 rounded ${
                t.tone === 'warm' ? 'bg-green-500/10 text-green-400' :
                t.tone === 'firm' ? 'bg-amber-500/10 text-amber-400' :
                'bg-red-500/10 text-red-400'
              }`}>{t.tone}</span>
              <h3 className="text-sm font-semibold">{t.name}</h3>
            </div>
            <Textarea
              value={t.template}
              onChange={e => updateTemplate(t.id, e.target.value)}
              rows={4}
              className="bg-slate-800 border-slate-700 text-slate-200 mb-3"
            />
            <p className="text-xs text-slate-500 mb-3">Variables: {'{{lead_name}}'}, {'{{business_type}}'}</p>
            <Button size="sm" onClick={() => toast.success(`${t.name} saved!`)}>Save Template</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AITemplates;

import { ArrowRight, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getTrialUrl } from '@/services/conversionLinks';

export default function TrialOffer() {
  const { t, lang } = useApp();
  const trial = t.trial;
  return (
    <div data-testid="trial-offer" className="mb-12 rounded-2xl border border-brand-300 bg-primary p-7 text-white sm:p-10">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{trial.badge}</span>
          <h3 className="mt-3 font-editorial text-3xl sm:text-4xl">{trial.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/80">{trial.description}</p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-xs text-white/85">
            {trial.highlights.map(item => <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" aria-hidden="true" />{item}</li>)}
          </ul>
        </div>
        <div className="shrink-0 lg:max-w-64">
          <a href={getTrialUrl(lang)} className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-ivory px-6 py-4 text-sm font-bold text-primary hover:bg-white">{trial.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          <p className="mt-3 text-center text-xs leading-relaxed text-white/70">{trial.note}</p>
        </div>
      </div>
    </div>
  );
}

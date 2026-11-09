import { TextReveal } from './TextReveal';

export function SectionHeading({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="mb-12 md:mb-16">
      <TextReveal 
        text={title} 
        className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4" 
      />
      {subtitle && (
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mt-4">
          {subtitle}
        </p>
      )}
    </div>
  );
}

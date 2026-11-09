import React from 'react';

export function TextReveal({ text, className = "" }: { text: string; className?: string }) {
  return (
    <h2 className={`font-extrabold tracking-tight text-slate-950 dark:text-white ${className}`}>
      {text}
    </h2>
  );
}

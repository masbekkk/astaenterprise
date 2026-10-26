import React from 'react';
import brand from '@/data/brand.js';
const { BRAND } = brand;

export const Logo = ({ className = '', reversed = false }) => (
  <a href="/" className={`flex min-w-0 items-center gap-2.5 select-none ${className}`} data-testid="logo-home-link" aria-label={`${BRAND.name} — ${BRAND.descriptor}`}>
    <img src={`/brand/berkahemas/v1/icon-${reversed ? 'reversed' : 'color'}.svg`} width="44" height="44" className="h-11 w-11 shrink-0" alt="" />
    <span className="min-w-0 leading-tight">
      <span className={`block text-xl font-bold tracking-tight ${reversed ? 'text-ivory' : 'text-foreground'}`} >{BRAND.name}</span>
      <span className={`mt-0.5 block text-xs font-medium ${reversed ? 'text-ivory/75' : 'text-muted-foreground'}`} >{BRAND.descriptor}</span>
    </span>
  </a>
);
export default Logo;

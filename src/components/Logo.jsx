import React from 'react';
import brand from '@/data/brand.js';
const { BRAND } = brand;

export const Logo = ({ className = '' }) => (
  <a href="/" className={`flex min-w-0 items-center gap-2.5 select-none ${className}`} data-testid="logo-home-link" aria-label={`${BRAND.name} — ${BRAND.descriptor}`}>
    <img src="/brand/berkahemas/v1/icon-color.svg" width="44" height="44" className="h-11 w-11 shrink-0" alt="" />
    <span className="min-w-0 leading-tight">
      <span className="block text-xl font-extrabold tracking-tight text-[#182923]">{BRAND.name}</span>
      <span className="mt-0.5 block text-xs font-medium text-[#526259]">{BRAND.descriptor}</span>
    </span>
  </a>
);
export default Logo;

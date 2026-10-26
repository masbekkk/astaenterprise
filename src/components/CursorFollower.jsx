import { useEffect, useRef } from 'react';

// A decorative, trailing gold ring. Native pointer and keyboard focus remain available.
export default function CursorFollower() {
  const ring = useRef(null);
  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const element = ring.current;
    let frame = 0;
    let visible = false;
    let current = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };
    const hide = () => {
      visible = false;
      element.dataset.visible = 'false';
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const animate = () => {
      const dx = target.x - current.x;
      const dy = target.y - current.y;
      current.x += dx * 0.2;
      current.y += dy * 0.2;
      element.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      if (visible && Math.abs(dx) + Math.abs(dy) > 0.15) frame = requestAnimationFrame(animate);
      else frame = 0;
    };
    const move = event => {
      if (!media.matches || event.pointerType !== 'mouse') { hide(); return; }
      target = { x: event.clientX, y: event.clientY };
      const node = event.target instanceof Element ? event.target : null;
      // Let text entry and selection use only the system cursor.
      if (node?.closest('input, textarea, select, [contenteditable="true"]')) { hide(); return; }
      if (!visible) current = { ...target };
      visible = true;
      element.dataset.visible = 'true';
      element.dataset.active = String(Boolean(node?.closest('a, button, summary, [role="button"]')));
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const leave = event => { if (!event.relatedTarget) hide(); };
    const key = event => { if (event.key === 'Tab') hide(); };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerout', leave);
    window.addEventListener('blur', hide);
    window.addEventListener('keydown', key);
    document.addEventListener('visibilitychange', hide);
    media.addEventListener('change', hide);
    return () => {
      hide();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerout', leave);
      window.removeEventListener('blur', hide);
      window.removeEventListener('keydown', key);
      document.removeEventListener('visibilitychange', hide);
      media.removeEventListener('change', hide);
    };
  }, []);
  return <div ref={ring} className="cursor-follower" aria-hidden="true" data-visible="false"><span /></div>;
}

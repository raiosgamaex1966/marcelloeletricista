import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  triggerOptions?: ScrollTrigger.Vars;
  stagger?: number;
  children?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const targets = options.children ? el.children : el;

    const tween = gsap.fromTo(
      targets,
      options.from,
      {
        ...options.to,
        stagger: options.stagger || 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          once: true,
          ...options.triggerOptions,
        },
      }
    );

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === el)
        .forEach((st) => st.kill());
    };
  }, []);

  return ref;
}

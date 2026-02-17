import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export default function Shuffle({
    text,
    className = '',
    style = {},
    shuffleDirection = 'right',
    duration = 0.35,
    animationMode = 'evenodd',
    shuffleTimes = 1,
    ease = 'power3.out',
    stagger = 0.03,
    threshold = 0.1,
    triggerOnce = true,
    triggerOnHover = false,
    respectReducedMotion = true,
    loop = false,
    loopDelay = 0
}) {
    const containerRef = useRef(null);
    const charsRef = useRef([]);
    const timeoutRef = useRef(null);
    const hasAnimated = useRef(false);

    const characters = text.split('');

    const scrambleChar = () => {
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
    };

    const animateCharacters = (direction = 'right') => {
        if (!containerRef.current) return;

        const chars = charsRef.current;
        const orderedChars = direction === 'left' ? [...chars].reverse() : chars;

        orderedChars.forEach((charEl, index) => {
            if (!charEl) return;

            const originalChar = charEl.dataset.char;
            const shouldAnimate = animationMode === 'random'
                ? Math.random() > 0.5
                : animationMode === 'evenodd'
                    ? index % 2 === 0
                    : true;

            if (shouldAnimate) {
                let scrambleCount = 0;
                const maxScrambles = shuffleTimes * 3;

                const scrambleInterval = setInterval(() => {
                    charEl.textContent = scrambleChar();
                    scrambleCount++;

                    if (scrambleCount >= maxScrambles) {
                        clearInterval(scrambleInterval);
                    }
                }, duration * 100);

                gsap.to(charEl, {
                    duration: duration,
                    delay: index * stagger,
                    ease: ease,
                    onComplete: () => {
                        clearInterval(scrambleInterval);
                        charEl.textContent = originalChar;
                    }
                });
            }
        });
    };

    useEffect(() => {
        // Check for reduced motion preference
        if (respectReducedMotion) {
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            if (mediaQuery.matches) return;
        }

        // Intersection Observer for scroll trigger
        if (!triggerOnHover) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            if (triggerOnce && hasAnimated.current) return;

                            hasAnimated.current = true;
                            animateCharacters(shuffleDirection);

                            if (loop) {
                                const runLoop = () => {
                                    timeoutRef.current = setTimeout(() => {
                                        animateCharacters(shuffleDirection);
                                        runLoop();
                                    }, (duration + stagger * characters.length) * 1000 + loopDelay);
                                };
                                runLoop();
                            }
                        }
                    });
                },
                { threshold }
            );

            if (containerRef.current) {
                observer.observe(containerRef.current);
            }

            return () => {
                observer.disconnect();
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            };
        }
    }, [triggerOnHover, triggerOnce, shuffleDirection, duration, stagger, loop, loopDelay, threshold, respectReducedMotion]);

    const handleMouseEnter = () => {
        if (triggerOnHover) {
            animateCharacters(shuffleDirection);
        }
    };

    return (
        <span
            ref={containerRef}
            className={className}
            style={{ display: 'inline-block', ...style }}
            onMouseEnter={handleMouseEnter}
        >
            {characters.map((char, index) => (
                <span
                    key={index}
                    ref={(el) => (charsRef.current[index] = el)}
                    data-char={char}
                    style={{
                        display: 'inline-block',
                        whiteSpace: char === ' ' ? 'pre' : 'normal'
                    }}
                >
                    {char}
                </span>
            ))}
        </span>
    );
}

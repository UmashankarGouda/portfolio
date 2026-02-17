import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const styles = {
    wrapper: {
        display: 'inline-block',
        whiteSpace: 'pre-wrap'
    },
    srOnly: {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        border: 0
    }
};

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    sequential = false,
    revealDirection = 'start',
    useOriginalCharsOnly = false,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
    className = '',
    parentClassName = '',
    encryptedClassName = '',
    animateOn = 'hover',
    loop = false,
    loopDelay = 2000,
    ...props
}) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const [revealedIndices, setRevealedIndices] = useState(new Set());
    const containerRef = useRef(null);
    const intervalRef = useRef(null);
    const loopTimeoutRef = useRef(null);
    const isInViewRef = useRef(false);

    const availableChars = characters.split('');

    const getNextIndex = (revealedSet) => {
        const textLength = text.length;
        switch (revealDirection) {
            case 'start':
                return revealedSet.size;
            case 'end':
                return textLength - 1 - revealedSet.size;
            case 'center': {
                const middle = Math.floor(textLength / 2);
                const offset = Math.floor(revealedSet.size / 2);
                const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
                if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
                    return nextIndex;
                }
                for (let i = 0; i < textLength; i++) {
                    if (!revealedSet.has(i)) return i;
                }
                return 0;
            }
            default:
                return revealedSet.size;
        }
    };

    const shuffleText = (originalText, currentRevealed) => {
        return originalText
            .split('')
            .map((char, i) => {
                if (char === ' ') return ' ';
                if (currentRevealed.has(i)) return originalText[i];
                return availableChars[Math.floor(Math.random() * availableChars.length)];
            })
            .join('');
    };

    const startLoop = () => {
        if (!loop || !isInViewRef.current) return;

        loopTimeoutRef.current = setTimeout(() => {
            if (isInViewRef.current) {
                runAnimation();
            }
        }, loopDelay);
    };

    const runAnimation = () => {
        // Clear any existing intervals/timeouts
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (loopTimeoutRef.current) {
            clearTimeout(loopTimeoutRef.current);
            loopTimeoutRef.current = null;
        }

        // Reset state
        let revealed = new Set();
        setRevealedIndices(new Set());
        setDisplayText(shuffleText(text, new Set()));
        setIsScrambling(true);

        let iterations = 0;

        intervalRef.current = setInterval(() => {
            if (sequential) {
                if (revealed.size < text.length) {
                    const nextIndex = getNextIndex(revealed);
                    revealed = new Set([...revealed, nextIndex]);
                    setRevealedIndices(new Set(revealed));
                    setDisplayText(shuffleText(text, revealed));
                } else {
                    // Animation complete
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setIsScrambling(false);
                    setDisplayText(text);

                    // Schedule next loop
                    startLoop();
                }
            } else {
                setDisplayText(shuffleText(text, revealed));
                iterations++;
                if (iterations >= maxIterations) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setIsScrambling(false);
                    setDisplayText(text);

                    // Schedule next loop
                    startLoop();
                }
            }
        }, speed);
    };

    // Intersection Observer - trigger animation when scrolling into view
    useEffect(() => {
        if (animateOn !== 'view' && animateOn !== 'both') return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        isInViewRef.current = true;
                        // Only start if not already running
                        if (!intervalRef.current) {
                            runAnimation();
                        }
                    } else {
                        isInViewRef.current = false;
                        // Clear loop timeout when out of view
                        if (loopTimeoutRef.current) {
                            clearTimeout(loopTimeoutRef.current);
                            loopTimeoutRef.current = null;
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
        };
    }, [animateOn]);

    const hoverProps =
        animateOn === 'hover' || animateOn === 'both'
            ? { onMouseEnter: runAnimation }
            : {};

    return (
        <motion.span className={parentClassName} ref={containerRef} style={styles.wrapper} {...hoverProps} {...props}>
            <span style={styles.srOnly}>{displayText}</span>
            <span aria-hidden="true">
                {displayText.split('').map((char, index) => {
                    const isRevealedOrDone = revealedIndices.has(index) || !isScrambling;
                    return (
                        <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
                            {char}
                        </span>
                    );
                })}
            </span>
        </motion.span>
    );
}

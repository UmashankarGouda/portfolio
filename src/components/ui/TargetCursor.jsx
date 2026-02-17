import { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

const TargetCursor = ({
    targetSelector = '.cursor-target',
    containerSelector = '#skills',
    spinDuration = 2,
    hoverDuration = 0.2,
    parallaxOn = true
}) => {
    const cursorRef = useRef(null);
    const cornersRef = useRef(null);
    const spinTl = useRef(null);
    const dotRef = useRef(null);
    const [isInSection, setIsInSection] = useState(false);

    const isActiveRef = useRef(false);
    const targetCornerPositionsRef = useRef(null);
    const tickerFnRef = useRef(null);
    const activeStrengthRef = useRef(0);

    const isMobile = useMemo(() => {
        const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 768;
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
        const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
        return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
    }, []);

    const constants = useMemo(
        () => ({
            borderWidth: 3,
            cornerSize: 12
        }),
        []
    );

    const moveCursor = useCallback((x, y) => {
        if (!cursorRef.current) return;
        gsap.to(cursorRef.current, {
            x,
            y,
            duration: 0.1,
            ease: 'power3.out'
        });
    }, []);

    useEffect(() => {
        if (isMobile || !cursorRef.current) return;

        const cursor = cursorRef.current;
        cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');

        let activeTarget = null;
        let currentLeaveHandler = null;
        let resumeTimeout = null;

        const cleanupTarget = target => {
            if (currentLeaveHandler) {
                target.removeEventListener('mouseleave', currentLeaveHandler);
            }
            currentLeaveHandler = null;
        };

        gsap.set(cursor, {
            xPercent: -50,
            yPercent: -50,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        });

        const createSpinTimeline = () => {
            if (spinTl.current) {
                spinTl.current.kill();
            }
            spinTl.current = gsap
                .timeline({ repeat: -1 })
                .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
        };

        createSpinTimeline();

        const tickerFn = () => {
            if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) {
                return;
            }

            const strength = activeStrengthRef.current;
            if (strength === 0) return;

            const cursorX = gsap.getProperty(cursorRef.current, 'x');
            const cursorY = gsap.getProperty(cursorRef.current, 'y');

            const corners = Array.from(cornersRef.current);
            corners.forEach((corner, i) => {
                const currentX = gsap.getProperty(corner, 'x');
                const currentY = gsap.getProperty(corner, 'y');

                const targetX = targetCornerPositionsRef.current[i].x - cursorX;
                const targetY = targetCornerPositionsRef.current[i].y - cursorY;

                const finalX = currentX + (targetX - currentX) * strength;
                const finalY = currentY + (targetY - currentY) * strength;

                const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;

                gsap.to(corner, {
                    x: finalX,
                    y: finalY,
                    duration: duration,
                    ease: duration === 0 ? 'none' : 'power1.out',
                    overwrite: 'auto'
                });
            });
        };

        tickerFnRef.current = tickerFn;

        // Cache the container element instead of querying every mousemove
        const containerEl = document.querySelector(containerSelector);

        let mouseMoveRafId = null;
        const moveHandler = e => {
            if (mouseMoveRafId) return; // Skip if a frame is already pending
            mouseMoveRafId = requestAnimationFrame(() => {
                mouseMoveRafId = null;
                moveCursor(e.clientX, e.clientY);

                // Check if mouse is inside the container section
                if (containerEl) {
                    const rect = containerEl.getBoundingClientRect();
                    const isInside = (
                        e.clientX >= rect.left &&
                        e.clientX <= rect.right &&
                        e.clientY >= rect.top &&
                        e.clientY <= rect.bottom
                    );
                    setIsInSection(isInside);
                }
            });
        };
        window.addEventListener('mousemove', moveHandler);

        let scrollRafId = null;
        const scrollHandler = () => {
            if (scrollRafId) return;
            scrollRafId = requestAnimationFrame(() => {
                scrollRafId = null;
                if (!activeTarget || !cursorRef.current) return;
                const mouseX = gsap.getProperty(cursorRef.current, 'x');
                const mouseY = gsap.getProperty(cursorRef.current, 'y');
                const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
                const isStillOverTarget =
                    elementUnderMouse &&
                    (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget);
                if (!isStillOverTarget) {
                    if (currentLeaveHandler) {
                        currentLeaveHandler();
                    }
                }
            });
        };
        window.addEventListener('scroll', scrollHandler, { passive: true });

        const mouseDownHandler = () => {
            if (!dotRef.current) return;
            gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
            gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
        };

        const mouseUpHandler = () => {
            if (!dotRef.current) return;
            gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
            gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
        };

        window.addEventListener('mousedown', mouseDownHandler);
        window.addEventListener('mouseup', mouseUpHandler);

        const enterHandler = e => {
            const directTarget = e.target;
            const allTargets = [];
            let current = directTarget;
            while (current && current !== document.body) {
                if (current.matches(targetSelector)) {
                    allTargets.push(current);
                }
                current = current.parentElement;
            }
            const target = allTargets[0] || null;
            if (!target || !cursorRef.current || !cornersRef.current) return;
            if (activeTarget === target) return;
            if (activeTarget) {
                cleanupTarget(activeTarget);
            }
            if (resumeTimeout) {
                clearTimeout(resumeTimeout);
                resumeTimeout = null;
            }

            activeTarget = target;
            const corners = Array.from(cornersRef.current);
            corners.forEach(corner => gsap.killTweensOf(corner));

            gsap.killTweensOf(cursorRef.current, 'rotation');
            spinTl.current?.pause();
            gsap.set(cursorRef.current, { rotation: 0 });

            const rect = target.getBoundingClientRect();
            const { borderWidth, cornerSize } = constants;
            const cursorX = gsap.getProperty(cursorRef.current, 'x');
            const cursorY = gsap.getProperty(cursorRef.current, 'y');

            targetCornerPositionsRef.current = [
                { x: rect.left - borderWidth, y: rect.top - borderWidth },
                { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
                { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
                { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
            ];

            isActiveRef.current = true;
            gsap.ticker.add(tickerFnRef.current);

            gsap.to(activeStrengthRef, {
                current: 1,
                duration: hoverDuration,
                ease: 'power2.out'
            });

            corners.forEach((corner, i) => {
                gsap.to(corner, {
                    x: targetCornerPositionsRef.current[i].x - cursorX,
                    y: targetCornerPositionsRef.current[i].y - cursorY,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });

            const leaveHandler = () => {
                gsap.ticker.remove(tickerFnRef.current);

                isActiveRef.current = false;
                targetCornerPositionsRef.current = null;
                gsap.set(activeStrengthRef, { current: 0, overwrite: true });
                activeTarget = null;

                if (cornersRef.current) {
                    const corners = Array.from(cornersRef.current);
                    gsap.killTweensOf(corners);
                    const { cornerSize } = constants;
                    const positions = [
                        { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
                        { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
                        { x: cornerSize * 0.5, y: cornerSize * 0.5 },
                        { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
                    ];
                    const tl = gsap.timeline();
                    corners.forEach((corner, index) => {
                        tl.to(
                            corner,
                            {
                                x: positions[index].x,
                                y: positions[index].y,
                                duration: 0.3,
                                ease: 'power3.out'
                            },
                            0
                        );
                    });
                }

                resumeTimeout = setTimeout(() => {
                    if (!activeTarget && cursorRef.current && spinTl.current) {
                        const currentRotation = gsap.getProperty(cursorRef.current, 'rotation');
                        const normalizedRotation = currentRotation % 360;
                        spinTl.current.kill();
                        spinTl.current = gsap
                            .timeline({ repeat: -1 })
                            .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
                        gsap.to(cursorRef.current, {
                            rotation: normalizedRotation + 360,
                            duration: spinDuration * (1 - normalizedRotation / 360),
                            ease: 'none',
                            onComplete: () => {
                                spinTl.current?.restart();
                            }
                        });
                    }
                    resumeTimeout = null;
                }, 50);

                cleanupTarget(target);
            };

            currentLeaveHandler = leaveHandler;
            target.addEventListener('mouseleave', leaveHandler);
        };

        window.addEventListener('mouseover', enterHandler, { passive: true });

        return () => {
            if (tickerFnRef.current) {
                gsap.ticker.remove(tickerFnRef.current);
            }
            if (mouseMoveRafId) cancelAnimationFrame(mouseMoveRafId);
            if (scrollRafId) cancelAnimationFrame(scrollRafId);

            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mouseover', enterHandler);
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('mousedown', mouseDownHandler);
            window.removeEventListener('mouseup', mouseUpHandler);

            if (activeTarget) {
                cleanupTarget(activeTarget);
            }

            spinTl.current?.kill();

            isActiveRef.current = false;
            targetCornerPositionsRef.current = null;
            activeStrengthRef.current = 0;
        };
    }, [targetSelector, containerSelector, spinDuration, moveCursor, constants, isMobile, hoverDuration, parallaxOn]);

    useEffect(() => {
        if (isMobile || !cursorRef.current || !spinTl.current) return;
        if (spinTl.current.isActive()) {
            spinTl.current.kill();
            spinTl.current = gsap
                .timeline({ repeat: -1 })
                .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
        }
    }, [spinDuration, isMobile]);

    // Control cursor visibility based on section
    useEffect(() => {
        const container = document.querySelector(containerSelector);
        if (container) {
            if (isInSection) {
                container.classList.add('hide-cursor');
            } else {
                container.classList.remove('hide-cursor');
            }
        }

        return () => {
            if (container) {
                container.classList.remove('hide-cursor');
            }
        };
    }, [isInSection, containerSelector]);

    if (isMobile) {
        return null;
    }

    return (
        <div
            ref={cursorRef}
            className="target-cursor-wrapper"
            style={{ opacity: isInSection ? 1 : 0, transition: 'opacity 0.2s ease' }}
        >
            <div ref={dotRef} className="target-cursor-dot" />
            <div className="target-cursor-corner corner-tl" />
            <div className="target-cursor-corner corner-tr" />
            <div className="target-cursor-corner corner-br" />
            <div className="target-cursor-corner corner-bl" />
        </div>
    );
};

export default TargetCursor;

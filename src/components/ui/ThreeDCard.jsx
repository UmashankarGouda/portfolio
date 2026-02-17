"use client";
import React, { createContext, useState, useContext, useRef, useEffect } from "react";

const MouseEnterContext = createContext([false, () => { }]);

export const CardContainer = ({ children, className, containerClassName }) => {
    const containerRef = useRef(null);
    const [isMouseEntered, setIsMouseEntered] = useState(false);
    const rafId = useRef(null);

    const handleMouseMove = (e) => {
        if (rafId.current) return; // Skip if a frame is already pending
        rafId.current = requestAnimationFrame(() => {
            rafId.current = null;
            if (!containerRef.current) return;
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / 25;
            const y = (e.clientY - top - height / 2) / 25;
            containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        });
    };

    const handleMouseEnter = () => {
        setIsMouseEntered(true);
    };

    const handleMouseLeave = () => {
        if (rafId.current) { cancelAnimationFrame(rafId.current); rafId.current = null; }
        if (!containerRef.current) return;
        setIsMouseEntered(false);
        containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    };

    return (
        <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
            <div
                className={containerClassName}
                style={{ perspective: "1000px" }}
            >
                <div
                    ref={containerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={className}
                    style={{
                        transformStyle: "preserve-3d",
                        transition: "all 0.2s ease-out"
                    }}
                >
                    {children}
                </div>
            </div>
        </MouseEnterContext.Provider>
    );
};

export const CardBody = ({ children, className }) => {
    return (
        <div
            className={className}
            style={{
                transformStyle: "preserve-3d"
            }}
        >
            {children}
        </div>
    );
};

export const CardItem = ({
    as: Tag = "div",
    children,
    className,
    translateX = 0,
    translateY = 0,
    translateZ = 0,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    ...rest
}) => {
    const ref = useRef(null);
    const [isMouseEntered] = useContext(MouseEnterContext);

    useEffect(() => {
        if (!ref.current) return;
        if (isMouseEntered) {
            ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
        } else {
            ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
        }
    }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

    return (
        <Tag
            ref={ref}
            className={className}
            style={{
                transition: "transform 0.2s ease-out",
                transformStyle: "preserve-3d"
            }}
            {...rest}
        >
            {children}
        </Tag>
    );
};

export default CardContainer;

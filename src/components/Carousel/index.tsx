"use client"

import React, { useEffect, useRef } from 'react';

type Props = {
    children: React.ReactNode;
}

const Carousel: React.FC<Props> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const leftButtonRef = useRef<HTMLButtonElement | null>(null);
    const rightButtonRef = useRef<HTMLButtonElement | null>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: direction === 'left' ? -containerRef.current.clientWidth : containerRef.current.clientWidth,
                behavior: 'smooth',
            });
        }
    };

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

            if (leftButtonRef.current && rightButtonRef.current) {
                leftButtonRef.current.disabled = scrollLeft === 0;
                rightButtonRef.current.disabled = scrollLeft + clientWidth >= scrollWidth;
            }
        }
    };

    useEffect(() => {
        handleScroll();

        containerRef.current?.addEventListener('scroll', handleScroll);
        containerRef.current?.addEventListener('resize', handleScroll);
        return () => {
            containerRef.current?.removeEventListener('scroll', handleScroll);
            containerRef.current?.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <div className="relative flex items-center">
            <button
                ref={leftButtonRef}
                className="btn btn-circle disabled:hidden"
                onClick={() => scroll('left')}
            >
                ❮
            </button>

            <div
                className="flex overflow-x-auto no-scrollbar space-x-4 mx-2 w-full"
                ref={containerRef}
            >
                {children}
            </div>

            <button
                ref={rightButtonRef}
                className="btn btn-circle disabled:hidden"
                onClick={() => scroll('right')}
            >
                ❯
            </button>
        </div>
    );
}

export default Carousel;

'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from "./clusterSlider.module.scss";
import { EventType } from '@/shared/types';
import { CurrentDates } from '@/shared/ui/currentDates';
import { ClusterItem } from '@/shared/ui/clusterItem';
import { BgLine } from '@/shared/ui/bgLines';

type Props = {
    activeIndex: number
    setActiveIndex: (n: number) => void
    isLoading: boolean
    clusters: EventType[][]
}

export const ClusterSlider = ({ activeIndex, setActiveIndex, isLoading, clusters }: Props) => {
    const circleRef = useRef<HTMLDivElement>(null);
    const [radius, setRadius] = useState<number>(0);

    const handleClick = (index: number) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        if (circleRef.current) {
            setRadius(circleRef.current.offsetWidth / 2);
        }
    }, [circleRef.current?.offsetWidth]);

    const getRotation = () => {
        const totalSlides = clusters.length;
        const rotationPerSlide = 360 / totalSlides;

        const targetRotation = -60 - (activeIndex * rotationPerSlide);

        const currentRotation = parseFloat(circleRef.current?.style.transform.replace(/[^0-9\-.,]/g, '') || "0");
        let deltaRotation = targetRotation - currentRotation;

        if (deltaRotation > 180) deltaRotation -= 360;
        if (deltaRotation < -180) deltaRotation += 360;

        return currentRotation + deltaRotation;
    };

    const calculateSlidePosition = (index: number) => {
        const angle = (index / clusters.length) * 2 * Math.PI;

        const x = 50 + (radius * Math.cos(angle)) / (circleRef.current?.offsetWidth || 1) * 100;
        const y = 50 + (radius * Math.sin(angle)) / (circleRef.current?.offsetHeight || 1) * 100;

        return { x, y };
    };

    return (
        <div className={styles.slider}>
            <BgLine direction='horizontal' />
            <div
                className={styles.circleWrapper}
                ref={circleRef}
                style={{
                    transform: `rotate(${getRotation()}deg)`,
                    transition: 'transform 1s ease-in-out',
                }}
            >
                <div className={styles.circle}>
                    {clusters.map((cluster, index) => {
                        const { x, y } = calculateSlidePosition(index);

                        return (
                            <ClusterItem
                                key={index}
                                style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    position: 'absolute',
                                    transform: `translate(-50%, -50%) rotate(${-getRotation()}deg`,
                                }}
                                activeIndex={activeIndex}
                                onClick={() => handleClick(index)}
                                index={index}
                                type={cluster[0].type}
                            />
                        );
                    })}
                </div>
            </div>
            {!isLoading && <CurrentDates
                sliderRadius={radius}
                slide={clusters[activeIndex]}
            />}
        </div>
    );
};

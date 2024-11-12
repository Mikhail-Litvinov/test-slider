import { useEffect, useState } from 'react';
import styles from './currentDates.module.scss';
import { EventType } from '@/shared/types';

type Props = {
    sliderRadius: number;
    slide: EventType[]
};

export const CurrentDates = ({ sliderRadius, slide }: Props) => {
    const [displayedFirst, setDisplayedFirst] = useState(parseInt(slide[0]?.date.slice(0, 4) || ''));
    const [displayedLast, setDisplayedLast] = useState(parseInt(slide[slide.length - 1]?.date.slice(0, 4) || ''));

    useEffect(() => {
        const animateDate = (
            current: number,
            target: number,
            setDate: React.Dispatch<React.SetStateAction<number>>
        ) => {
            if (current === target) return;

            const intervalId: NodeJS.Timeout = setInterval(() => {
                setDate((prev) => {
                    if (prev < target) return prev + 1;
                    if (prev > target) return prev - 1;

                    clearInterval(intervalId);
                    return prev;
                });
            }, 50);

            return intervalId;
        };

        const first = parseInt(slide[0]?.date.slice(0, 4) || '');
        const last = parseInt(slide[slide.length - 1]?.date.slice(0, 4) || '');

        const firstIntervalId = animateDate(displayedFirst, first, setDisplayedFirst);
        const lastIntervalId = animateDate(displayedLast, last, setDisplayedLast);

        return () => {
            if (firstIntervalId) clearInterval(firstIntervalId);
            if (lastIntervalId) clearInterval(lastIntervalId);
        };
    }, [slide]);

    return (

        <div className={styles.container}>
            <div
                className={styles.date}
                style={{
                    left: `calc(50% - ${sliderRadius}px)`,
                    transform: 'translateX(-50%)',
                }}
            >
                {displayedFirst}
            </div>
            <div
                className={styles.date}
                style={{
                    right: `calc(50% - ${sliderRadius}px)`,
                    transform: 'translateX(50%)',
                }}
            >
                {displayedLast}
            </div>
        </div>
    );
};

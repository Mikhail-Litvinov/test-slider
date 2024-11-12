'use client';

import { EventType } from "@/shared/types";
import { ClusterSlider } from "@/widgets/clusterSlider"
import styles from './slider.module.scss'
import { ClusterNavigation } from "@/shared/ui/clustersNavigation";
import { HorizontalSlider } from "@/widgets/horizontalSlider";
import { SliderHeader } from "@/widgets/slidetHeader";
import { useUnit } from "effector-react";
import { $isMobile } from "@/store/browserStore";
import { useState } from "react";

type Props = {
    clusters: EventType[][]
    isLoading: boolean
}

export const Slider = ({ clusters, isLoading }: Props) => {
    const isMobile = useUnit($isMobile)
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div className={styles.container}>
            <SliderHeader />
            <div className={styles.sliderWrapper}>
                <ClusterSlider
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    isLoading={isLoading}
                    clusters={clusters}
                />
                {!isMobile &&
                    <ClusterNavigation
                        setActiveSlide={setActiveIndex}
                        slidesNumber={clusters?.length - 1}
                        activeSlide={activeIndex}
                    />}
            </div>
            <HorizontalSlider
                slides={clusters[activeIndex]}
            />
            {isMobile &&
                <div className={styles.navigationContainer}>
                    <div className={styles.navigationWrapper}>
                        <ClusterNavigation
                            setActiveSlide={setActiveIndex}
                            slidesNumber={clusters?.length - 1}
                            activeSlide={activeIndex}
                        />
                        <div className={styles.pagination}>
                            {clusters?.map((_, i) => {
                                return (
                                    <div
                                        key={`pagination_${i}`}
                                        className={activeIndex === i ? `${styles.dot} ${styles.active}` : styles.dot}
                                        onClick={() => setActiveIndex(i)}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

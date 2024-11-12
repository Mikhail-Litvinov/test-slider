import { EventType } from '@/shared/types'
import styles from './horizontalSlider.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules'
import * as Icon from '@/shared/icons'
import { useState } from 'react';
import { Swiper as SwyperType } from 'swiper';
import { $isMobile } from '@/store/browserStore';
import { useUnit } from 'effector-react';

type Props = {
    slides: EventType[]
}
export const HorizontalSlider = ({ slides }: Props) => {
    const isMobile = useUnit($isMobile)
    const [isStart, setIsStart] = useState<boolean>(true)
    const [isEnd, setIsEnd] = useState<boolean>(false)

    function handleClick(e: SwyperType) {
        setIsStart(e.isBeginning)
        setIsEnd(e.isEnd)
    }

    return (
        <div className={styles.container}>
            <Swiper
                spaceBetween={'80px'}
                slidesPerView={isMobile ? 1 : 3}
                navigation={!isMobile && { nextEl: '#button-next', prevEl: '#button-prev' }}
                modules={[Navigation]}
                onNavigationPrev={handleClick}
                onNavigationNext={handleClick}
                wrapperClass={'swiper-custom'}
            >
                {slides?.map((slide, index) => {
                    return (
                        <SwiperSlide
                            className={styles.slideContainer}
                            key={`swiperSlide_${slide.date}_${index}`}
                        >
                            <div className={styles.slide}>
                                <span className={styles.date}>{parseInt(slide.date.slice(0, 4) || '')}</span>
                                <p className={styles.description}>{slide.description}</p>
                            </div>
                        </SwiperSlide>
                    )
                })

                }
            </Swiper>
            <button className={`${styles.navigationButton} ${styles.left}`} id='button-prev' disabled={isStart}><Icon.ArrowLeft /></button>
            <button className={`${styles.navigationButton} ${styles.right}`} id='button-next' disabled={isEnd}><Icon.ArrowRight /></button>
        </div>
    )
}

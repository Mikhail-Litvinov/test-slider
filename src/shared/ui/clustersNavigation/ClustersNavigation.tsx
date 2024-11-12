import { $isMobile } from '@/store/browserStore'
import { NavButton } from '../button'
import styles from './clustersNavigation.module.scss'
import * as Icon from '@/shared/icons'
import { useUnit } from 'effector-react'

type Props = {
    slidesNumber: number
    setActiveSlide: (n: number) => void
    activeSlide: number
}

export const ClusterNavigation = ({ slidesNumber, setActiveSlide, activeSlide }: Props) => {
    const isMobile = useUnit($isMobile)
    function handleClick(next: number) {
        if (next > slidesNumber) {
            setActiveSlide(0)
        } else {
            if (next < 0) {
                setActiveSlide(slidesNumber)
            } else {
                setActiveSlide(next)
            }
        }
    }

    return (
        <div className={styles.container}>
            <span>{`0${activeSlide + 1}/0${slidesNumber + 1}`}</span>
            <div>
                <NavButton
                    onClick={() => handleClick(activeSlide - 1)}
                    disabled={activeSlide === 0}
                >
                    <Icon.ArrowLeft size={isMobile ? 'mobile' : 'small'} />
                </NavButton>
                <NavButton
                    disabled={activeSlide === slidesNumber}
                    onClick={() => handleClick(activeSlide + 1)}
                >
                    <Icon.ArrowRight size={isMobile ? 'mobile' : 'small'} />
                </NavButton>
            </div>
        </div>
    )
}

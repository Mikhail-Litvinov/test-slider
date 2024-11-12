'use client'

import React, { useState } from 'react'
import styles from './clusterItem.module.scss'

type Props = {
    activeIndex: number
    style: React.CSSProperties | undefined
    index: number
    onClick: () => void
    type?: string
}

export const ClusterItem = ({ activeIndex, style, index, onClick, type }: Props) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const slideClass = activeIndex === index ? `${styles.item} ${styles.active}` : styles.item;

    return (
        <div
            className={slideClass}
            style={style}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.contentWrapper}>
                {(activeIndex === index || isHovered) && `${index + 1}`}
                <div className={activeIndex === index ? `${styles.tip} ${styles.active}` : styles.tip}>
                    {type ?? ''}
                </div>
            </div>
        </div>
    )
}
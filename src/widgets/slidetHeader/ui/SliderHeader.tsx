import styles from './sliderHeader.module.scss'

export const SliderHeader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.gradientLine} />
            <h1>
                {'Исторические даты'}
            </h1>
        </div>
    )
}

import styles from './bgLines.module.scss'

type Props = {
    direction?: 'horizontal' | 'vertical'
}

export const BgLine = ({ direction = 'vertical' }: Props) => {

    const selectStyle = {
        vertical: styles.vertical,
        horizontal: styles.horizontal
    }

    return (
        <div className={selectStyle[direction]} />
    )
} 
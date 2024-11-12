type IconSize = 'large' | 'small' | 'mobile' | `${number}rem` | `${number}em`

const iconSize: Record<IconSize, string | undefined> = {
    large: '24px',
    small: '10px',
    mobile: '6px'
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: IconSize
}

export const getIconSize = (size: IconSize = 'small') => iconSize[size] ?? size

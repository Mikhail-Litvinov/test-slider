import { getIconSize, IconProps } from "../utils/utils"

export const ArrowRight = (props: IconProps) => {
    return (
        <svg width={getIconSize(props.size)} viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M1.50012 0.750001L7.75012 7L1.50012 13.25" />
        </svg>
    )
}

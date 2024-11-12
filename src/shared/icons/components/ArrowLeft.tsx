import { getIconSize, IconProps } from "../utils/utils"

export const ArrowLeft = (props: IconProps) => {
    return (
        <svg width={getIconSize(props.size)} viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" />
        </svg>
    )
}

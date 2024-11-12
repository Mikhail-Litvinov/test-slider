import { ButtonHTMLAttributes, forwardRef } from "react";
import style from './navButton.module.scss'

const NavButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ children, ...rest }, ref) => {
    return (
        <button
            {...rest}
            className={style.navbutton}
            ref={ref}
        >
            {children}
        </button>
    )
}
)

NavButton.displayName = 'NavButton'

export default NavButton

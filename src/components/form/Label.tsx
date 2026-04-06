import type { ReactNode } from "react"

export interface IFormLabelProps{
    htmlFor?: string,
    label: ReactNode,
    className?: string
}

export const FormLabel = ({htmlFor, label, className=''}: Readonly<IFormLabelProps>) => {
        return(
            <>
                <label htmlFor={htmlFor} className={`block text-xs font-bold uppercase tracking-wider text-slate-400 px-1 ${className}`}>
                {label}</label>
            </>
        )
}
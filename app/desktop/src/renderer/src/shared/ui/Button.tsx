import { ComponentPropsWithRef } from 'react';

type buttonProps = ComponentPropsWithRef<'button'>;

export default function Button({ children, className = '', ...props }: buttonProps) {
    return (
        <button
            className={`bg-button-main rounded-md py-2.5 px-4 mb-2 cursor-pointer border-b-4 border-transparent shadow-[0_4px_0_var(--color-button-main)] transition-all duration-100 hover:translate-y-px active:translate-y-1 active:shadow-none ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

import { ComponentPropsWithRef } from 'react';

type modalProps = ComponentPropsWithRef<'div'>;

export default function Modal({ children, className = '', ...props }: modalProps) {
    return (
        <div
            className="absolute inset-0 z-10"
            {...props}
        >
            <div className="absolute inset-0 bg-[#14141475]" />

            <div className="absolute inset-10 bg-panel py-2.5 px-4 border border-white rounded">
                <div className="flex justify-end">
                    <div className="cursor-pointer">X</div>
                </div>

                {children}
            </div>
        </div>
    );
}

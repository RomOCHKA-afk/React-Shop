import { FC, ForwardedRef } from "react";
import cn from "clsx";
import { IField } from "./field.interface";
import { forwardRef } from "react";

const Field = forwardRef<HTMLInputElement, IField>(
    ({ placeholder, error, className, type = 'text', style, Icon, ...rest }, ref) => {
        return (
            <div className={cn('mb-4', className)} style={style}>
                <label>
                    <span className="mb-1 block">{placeholder}
                        {Icon && <Icon className="mr-3"/>}
                    </span>
                    <input ref={ref} type={type} className={cn('px-4 py-2 w-full outline-none border border-gray border-solid focus:border-primary transition-all placeholder font-light rounded-lg', {'border-red': error})} {...rest} />
                </label>
                {error && <div className='text-red mt-1'>{error}</div>}
            </div>
        );
    }
);

Field.displayName = "Field"

export default Field;

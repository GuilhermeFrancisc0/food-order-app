import React from 'react';
import { useController } from 'react-hook-form';

type Props = {
    name: string;
    label?: string;
    containerClass?: React.HTMLAttributes<HTMLLabelElement>['className'];
} & JSX.IntrinsicElements['input'];

const TextInput: React.FC<Props> = ({ name, label, containerClass, ...props }) => {
    const { field, fieldState: { error } } = useController({ name });

    return (
        <label className={`form-control w-full max-w-xs ${containerClass}`}>
            {label &&
                <div className="label px-0">
                    <span className="text-primary">{label}</span>
                </div>
            }

            <input {...field} className="input input-bordered input-primary w-full max-w-xs" {...props} />

            {error &&
                <div className="label pb-0">
                    <span className="label-text-alt text-error">{error.message}</span>
                </div>
            }
        </label>
    )
}

export default TextInput;

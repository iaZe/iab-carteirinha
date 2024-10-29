import { forwardRef } from "react";
import { IMaskInput } from "react-imask";



interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}


export const CpfMask = forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="000.000.000-00"
                definitions={{
                    '#': /[1-9]/,
                }}
                inputRef={ref}
                onAccept={(value) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

export const CepMask = forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="00000-000"
                definitions={{
                    '#': /[1-9]/,
                }}
                inputRef={ref}
                onAccept={(value) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

export const TelefoneMask = forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="(00) 00000-0000"
                definitions={{
                    '#': /[1-9]/,
                }}
                inputRef={ref}
                onAccept={(value) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

export const AnoMask = forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="0000"
                definitions={{
                    '#': /[1-9]/,
                }}
                inputRef={ref}
                onAccept={(value) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);


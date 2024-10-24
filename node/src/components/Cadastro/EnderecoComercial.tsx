import { useState, ChangeEvent } from 'react';
import { Box, CircularProgress, TextField } from "@mui/material";
import { ActionButtons } from "../ActionButtons";
import { FormObjectProps } from '../../context/FormContext';
import { CepMask } from '../MaskedInput';

export function EnderecoComercial() {
    const [formValues, setFormValues] = useState<FormObjectProps>({
        cep: '',
        logradouro: '',
        cidade: '',
        bairro: '',
        numero: '',
        complemento: ''
    });

    const [error, setError] = useState<string[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (error.includes(name)) {
            setError(error.filter((fieldName) => fieldName !== name));
        }
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAvancar = () => {
        return true
        const requiredFields = ['cep', 'logradouro', 'cidade', 'bairro', 'numero'];
        const newErrors = [];

        for (const field of requiredFields) {
            if (!formValues[field]) {
                newErrors.push(field);
            }
        }
        setError(newErrors);

        if (newErrors.length > 0) {
            return false;
        }
        return true;
    };

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>

                        <TextField
                            name="cep"
                            error={error.includes("cep")}
                            label="CEP*"
                            slotProps={{
                                input: {
                                    inputComponent: CepMask as never,
                                }
                            }}
                        />

                <CircularProgress size={35} color="error" />
            </Box>
            <Box>
                <TextField
                    fullWidth
                    name="logradouro"
                    error={error.includes("logradouro")}
                    label="Logradouro"
                    value={formValues.logradouro}
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{ display: "flex", gap: "2rem" }}>
                <TextField
                    sx={{ width: "40%" }}
                    name="cidade"
                    error={error.includes("cidade")}
                    label="Cidade"
                    value={formValues.cidade}
                    onChange={handleChange}
                />
                <TextField
                    name="bairro"
                    error={error.includes("bairro")}
                    label="Bairro"
                    value={formValues.bairro}
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{ display: "flex", gap: "2rem" }}>
                <TextField
                    name="numero"
                    error={error.includes("numero")}
                    label="Número"
                    value={formValues.numero}
                    onChange={handleChange}
                />
                <TextField
                    name="complemento"
                    label="Complemento"
                    value={formValues.complemento}
                    onChange={handleChange}
                />
            </Box>
            <ActionButtons handleCheckFields={handleAvancar} />
        </>
    );
}

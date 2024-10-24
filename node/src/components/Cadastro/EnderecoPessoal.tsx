import { useState, ChangeEvent, useContext } from 'react';
import { Box, CircularProgress, TextField } from "@mui/material";
import { ActionButtons } from "../ActionButtons";
import { FormContext } from '../../context/FormContext';
import { CepMask } from '../MaskedInput';

const mobileStyles = {
    "@media (max-width: 600px)": {
        width: "100%",
        flexDirection: "column"
    }
}


export function EnderecoPessoal() {
    const { formData, updateFormData } = useContext(FormContext)
    const { endereco_primario } = formData;
    const { cep, cidade, logradouro, bairro, numero, complemento } = endereco_primario;

    const [error, setError] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleAvancar = () => {
        const requiredFields = ['cep', 'logradouro', 'cidade', 'bairro', 'numero'];
        const newErrors = [];

        for (const field of requiredFields) {
            if (!formData[field]) {
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
                            name="endereco_primario.cep"
                            error={error.includes("cep")}
                            label="CEP*"
                            sx={mobileStyles}
                            slotProps={{
                                input: {
                                    inputComponent: CepMask as never,
                                }
                            }}
                            value={cep}
                            onChange={updateFormData}
                        />
                {
                    loading 
                    ? <CircularProgress size={35} color="error" />
                    : null
                }
            </Box>
            <Box>
                <TextField
                    fullWidth
                    name="endereco_primario.logradouro"
                    error={error.includes("logradouro")}
                    label="Logradouro*"
                    value={logradouro}
                    onChange={updateFormData}
                />
            </Box>
            <Box sx={{ display: "flex", gap: "2rem", ...mobileStyles }}>
                <TextField
                    sx={{ width: "40%", ...mobileStyles }}
                    name="endereco_primario.cidade"
                    error={error.includes("cidade")}
                    label="Cidade*"
                    value={cidade}
                    onChange={updateFormData}
                />
                <TextField
                    name="endereco_primario.bairro"
                    error={error.includes("bairro")}
                    label="Bairro*"
                    value={bairro}
                    onChange={updateFormData}
                />
            </Box>
            <Box sx={{ display: "flex", gap: "2rem", ...mobileStyles }}>
                <TextField
                    name="endereco_primario.numero"
                    error={error.includes("numero")}
                    label="Número*"
                    value={numero}
                    onChange={updateFormData}
                />
                <TextField
                    name="endereco_primario.complemento"
                    label="Complemento"
                    value={complemento}
                    onChange={updateFormData}
                />
            </Box>
            <ActionButtons handleCheckFields={handleAvancar} />
        </>
    );
}

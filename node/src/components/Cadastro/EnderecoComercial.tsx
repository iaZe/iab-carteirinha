import { useState, ChangeEvent, useEffect, useContext } from 'react';
import { Box, CircularProgress, TextField } from "@mui/material";
import { ActionButtons } from "../ActionButtons";
import { FormContext, FormObjectProps } from '../../context/FormContext';
import { CepMask } from '../MaskedInput';

const mobileStyles = {
    "@media (max-width: 600px)": {
        width: "100%",
        flexDirection: "column"
    }
}


export function EnderecoComercial() {
    const { formData, updateFormData, errors, addError } = useContext(FormContext)
    const { endereco_secundario } = formData;
    const { cep, cidade, logradouro, bairro, numero, complemento } = endereco_secundario;

    const [loading, setLoading] = useState(false);


    
    const handleAvancar = () => {
        const newErrors = [];

        if (cep.length < 9) newErrors.push("endereco_secundario.cep");
        if (logradouro.trim().length < 2) newErrors.push("endereco_secundario.logradouro");
        if (cidade.trim().length < 2) newErrors.push("endereco_secundario.cidade");
        if (bairro.trim().length < 2) newErrors.push("endereco_secundario.bairro");
        if (numero.trim().length < 1) newErrors.push("endereco_secundario.numero");
        if (complemento.trim().length > 50) newErrors.push("endereco_secundario.complemento");

        if (newErrors.length > 0) {
            addError(newErrors);
            return false;
        }
        return newErrors.length === 0;
    };


    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                        <TextField
                            name="endereco_secundario.cep"
                            error={errors.includes("cep")}
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
                    name="endereco_secundario.logradouro"
                    error={errors.includes("logradouro")}
                    label="Logradouro*"
                    value={logradouro}
                    onChange={updateFormData}
                />
            </Box>
            <Box sx={{ display: "flex", gap: "2rem", ...mobileStyles }}>
                <TextField
                    sx={{ width: "40%", ...mobileStyles }}
                    name="endereco_secundario.cidade"
                    error={errors.includes("cidade")}
                    label="Cidade*"
                    value={cidade}
                    onChange={updateFormData}
                />
                <TextField
                    name="endereco_secundario.bairro"
                    error={errors.includes("bairro")}
                    label="Bairro*"
                    value={bairro}
                    onChange={updateFormData}
                />
            </Box>
            <Box sx={{ display: "flex", gap: "2rem", ...mobileStyles }}>
                <TextField
                    name="endereco_secundario.numero"
                    error={errors.includes("numero")}
                    label="Número*"
                    value={numero}
                    onChange={updateFormData}
                />
                <TextField
                    name="endereco_secundario.complemento"
                    label="Complemento"
                    value={complemento}
                    onChange={updateFormData}
                />
            </Box>
            <ActionButtons handleCheckFields={handleAvancar} />
        </>
    );
}

import { useState, useContext } from "react";
import { Box, CircularProgress, TextField } from "@mui/material";
import { ActionButtons } from "../ActionButtons";
import { FormContext } from "../../context/FormContext";
import { CepMask } from "../MaskedInput";

const mobileStyles = {
    "@media (max-width: 600px)": {
        width: "100%",
        flexDirection: "column",
    },
};

export function EnderecoPessoal() {
    const { formData, updateFormData, errors, addError } =
        useContext(FormContext);
    const { endereco_primario } = formData;
    const { cep, cidade, logradouro, bairro, numero, complemento } =
        endereco_primario;

    const [loading, setLoading] = useState(false);


    const handleAvancar = () => {
        const newErrors = [];
        if (cep.length < 9) newErrors.push("endereco_primario.cep");
        if (logradouro.trim().length < 2) newErrors.push("endereco_primario.logradouro");
        if (cidade.trim().length < 2) newErrors.push("endereco_primario.cidade");
        if (bairro.trim().length < 2) newErrors.push("endereco_primario.bairro");
        if (numero.trim().length < 1) newErrors.push("endereco_primario.numero");
        if (complemento.trim().length > 50) newErrors.push("endereco_primario.complemento");
        
        if (newErrors.length > 0) {
            console.log(newErrors);
            addError(newErrors);
            return false;
        }
        return newErrors.length === 0;
    };

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <TextField
                    name="endereco_primario.cep"
                    error={errors.includes("endereco_primario.cep")}
                    label="CEP*"
                    sx={mobileStyles}
                    slotProps={{
                        input: {
                            inputComponent: CepMask as never,
                        },
                    }}
                    value={cep}
                    onChange={updateFormData}
                />
                {loading ? <CircularProgress size={35} color="error" /> : null}
            </Box>
            <Box>
                <TextField
                    fullWidth
                    name="endereco_primario.logradouro"
                    error={errors.includes("endereco_primario.logradouro")}
                    label="Logradouro*"
                    value={logradouro}
                    onChange={updateFormData}
                />
            </Box>
            <Box sx={{ display: "flex", gap: "2rem", ...mobileStyles }}>
                <TextField
                    name="endereco_primario.numero"
                    error={errors.includes("endereco_primario.numero")}
                    label="Número*"
                    value={numero}
                    onChange={updateFormData}
                />
                <TextField
                    sx={{ width: "40%", ...mobileStyles }}
                    name="endereco_primario.cidade"
                    error={errors.includes("endereco_primario.cidade")}
                    label="Cidade*"
                    value={cidade}
                    onChange={updateFormData}
                />
                <TextField
                    name="endereco_primario.bairro"
                    error={errors.includes("endereco_primario.bairro")}
                    label="Bairro*"
                    value={bairro}
                    onChange={updateFormData}
                />
            </Box>
            <Box sx={{ display: "flex", gap: "2rem", ...mobileStyles }}>

                <TextField
                    fullWidth
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

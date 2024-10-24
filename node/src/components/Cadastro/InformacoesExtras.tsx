import React from 'react';
import { Box, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { ActionButtons } from "../ActionButtons";

const mobileStyles = {
    "@media (max-width: 600px)": {
        width: "100%",
        flexDirection: "column"
    }
}

export function InformacoesExtras() {
    const [formValues, setFormValues] = useState({
        site: "",
        instituicaoEnsino: "",
        numeroCau: "",
        anoConclusao: ""
    });

    const [publicarChecked, setPublicarChecked] = useState(true);
    const [error, setError] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        const requiredFields = ["site", "numeroCau"];
        const newErrors = [];
        for (const field of requiredFields) {
            if (!formValues[field] || formValues[field].trim().length < 2) {
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
            <Box>
                <Typography sx={{ fontWeight: "medium", color: "#00000099" }}>
                    Você deseja publicar seus dados básicos no nosso Banco de Arquitetos?
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem"
                    }}
                >

                    <FormControlLabel
                        control={
                            <Checkbox
                                color="error"
                                checked={publicarChecked}
                                onClick={() => setPublicarChecked(true)}
                            />
                        }
                        label="Sim"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="error"
                                checked={!publicarChecked}
                                onClick={() => setPublicarChecked(false)}
                            />
                        }
                        label="Não"
                    />
                </Box>
            </Box>
            <Box>
                <TextField
                    sx={{ width: "50%", ...mobileStyles }}
                    fullWidth
                    label="Site"
                    name="site"
                    value={formValues.site}
                    error={error.includes("site")}
                    onChange={handleChange}
                />
            </Box>
            <Box>
                <TextField
                    sx={{ width: "35%", ...mobileStyles  }}
                    fullWidth
                    label="Instituição de Ensino (Estudantes)"
                    name="instituicaoEnsino"
                    value={formValues.instituicaoEnsino}
                    onChange={handleChange}
                />
            </Box>
            <Box>
                <TextField
                    sx={{ width: "30%", ...mobileStyles  }}
                    fullWidth
                    label="Número CAU"
                    name="numeroCau"
                    value={formValues.numeroCau}
                    error={error.includes("numeroCau")}
                    onChange={handleChange}
                />
            </Box>
            <Box>
                <TextField
                    sx={{ width: "30%", ...mobileStyles  }}
                    fullWidth
                    label="Ano Estimado de Conclusão"
                    name="anoConclusao"
                    value={formValues.anoConclusao}
                    onChange={handleChange}
                />
            </Box>
            <ActionButtons handleCheckFields={handleAvancar} />
        </>
    );
}

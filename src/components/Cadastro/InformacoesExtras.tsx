import { useContext } from 'react';
import { Box, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { ActionButtons } from "../ActionButtons";
import { FormContext } from '../../context/FormContext';
import { AnoMask } from '../MaskedInput';

const mobileStyles = {
    "@media (max-width: 600px)": {
        width: "100%",
        flexDirection: "column"
    }
}

export function InformacoesExtras() {
    const { formData, updateFormData, sendFormData } = useContext(FormContext)
    const { site, instituicao_ensino, numero_cau, ano_estimado_conclusao } = formData;

    const [publicarChecked, setPublicarChecked] = useState(true);
    const [error, setError] = useState<string[]>([]);
    

    
    const handleAvancar = () => {
        const newErrors = [];
        if (publicarChecked) {
            if (!(site.includes('http://') || !(site.includes('https://')))) {
                newErrors.push("site")
            }
            if (instituicao_ensino.trim().length < 2) {
                newErrors.push("instituicao_ensino")
            }
            if (numero_cau.trim().length < 2) {
                newErrors.push("numero_cau")
            }
            if (Number(ano_estimado_conclusao) < new Date().getFullYear()) {
                newErrors.push("ano_estimado_conclusao")
            }
            setError(newErrors);
        }

        if (newErrors.length > 0) {
            console.log(error)
            return false;
        }
        sendFormData();
        return true;
    };


    return (
        <>
            <Box>
                <Typography sx={{ fontWeight: "medium", color: "#00000099", maxWidth: "30rem" }}>
                    Você deseja publicar seus dados básicos no nosso Banco de Arquitetos?
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        gap: "1rem"
                    }}
                >

                    <FormControlLabel
                        control={
                            <Checkbox
                                color="error"
                                checked={publicarChecked}
                                onClick={() => setPublicarChecked(true)}
                                onChange={(e) => {
                                    const { target } = e
                                    updateFormData({
                                        ...e,
                                        target: {
                                            ...target,
                                            name: "publicar",
                                            value: "true",
                                        }
                                    })
                                }}
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
                                onChange={(e) => {
                                    const { target } = e
                                    updateFormData({
                                        ...e,
                                        target: {
                                            ...target,
                                            name: "publicar",
                                            value: "false",
                                        }
                                    })
                                }}
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
                    value={site}
                    error={error.includes("site")}
                    onChange={updateFormData}
                />
            </Box>
            <Box>
                <TextField
                    sx={{ width: "35%", ...mobileStyles  }}
                    fullWidth
                    label="Instituição de Ensino (Estudantes)"
                    name="instituicao_ensino"
                    value={instituicao_ensino}
                    error={error.includes("instituicao_ensino")}
                    onChange={updateFormData}
                />
            </Box>
            <Box>
                <TextField
                    sx={{ width: "30%", ...mobileStyles  }}
                    fullWidth
                    label="Número CAU"
                    name="numero_cau"
                    value={numero_cau}
                    error={error.includes("numero_cau")}
                    onChange={updateFormData}
                />
            </Box>
            <Box>
                <TextField
                    sx={{ width: "30%", ...mobileStyles  }}
                    fullWidth
                    label="Ano Estimado de Conclusão"
                    name="ano_estimado_conclusao"
                    value={ano_estimado_conclusao}
                    error={error.includes("ano_estimado_conclusao")}
                    onChange={updateFormData}
                    slotProps={{
                        input: {
                            inputComponent: AnoMask as never,
                        },
                    }}
                />
            </Box>
            <ActionButtons handleCheckFields={handleAvancar} />
        </>
    );
}

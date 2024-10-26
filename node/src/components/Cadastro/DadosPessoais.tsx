import {
    Box,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { ActionButtons } from "../ActionButtons";
import { FormContext } from "../../context/FormContext";
import { CpfMask, TelefoneMask } from "../MaskedInput";

export function DadosPessoais() {
    const { formData, updateFormData, errors, addError } = useContext(FormContext)
    const { nome, email, cpf, celular, fixo, usuario, senha } = formData;

    const [checkbox, setCheckbox] = useState("Arquiteto")


    const handleAvancar = () => {
        const newErrors = []
        if (nome.length < 10) newErrors.push("nome");
        if (!email.includes("@")) newErrors.push("email");
        if (cpf.length < 14) newErrors.push("cpf");
        if (celular.length < 14) newErrors.push("celular");

        if (newErrors.length > 0) {
            addError(newErrors)
            return false;
        }
        return errors.length === 0;
    };

    return (
        <>
            <Box>
                <TextField
                    fullWidth
                    name="nome"
                    error={errors.includes("nome")}
                    label="Nome Completo*"
                    value={nome}
                    onChange={updateFormData}
                />
            </Box>
            <Box>
                <TextField
                    fullWidth
                    name="email"
                    error={errors.includes("email")}
                    label="Email*"
                    value={email}
                    onChange={updateFormData}
                />
            </Box>
            <Box>

                <TextField
                    name="cpf"
                    error={errors.includes("cpf")}
                    label="CPF*"
                    value={cpf}
                    sx={{ width: "50%", "@media (max-width: 600px)": { width: "100%" } }}
                    slotProps={{
                        input: {
                            inputComponent: CpfMask as never,
                        }
                    }}
                    onChange={updateFormData}
                />
            </Box>
            <Box sx={{ display: "flex", gap: "2rem", "@media (max-width: 600px)": { flexDirection: "column" } }}>
                <TextField
                    name="celular"
                    error={errors.includes("celular")}
                    label="Celular*"
                    value={celular}
                    slotProps={{
                        input: {
                            inputComponent: TelefoneMask as never,
                        }
                    }}
                    onChange={updateFormData}
                />
                <TextField
                    name="fixo"
                    error={errors.includes("fixo")}
                    label="Telefone Fixo - Opcional"
                    value={fixo}
                    slotProps={{
                        input: {
                            inputComponent: TelefoneMask as never,
                        }
                    }}
                    onChange={updateFormData}
                />
            </Box>
            <Box sx={{ display: "flex", gap: "2rem", "@media (max-width: 600px)": { flexDirection: "column" } }}>
                <TextField
                    name="usuario"
                    error={errors.includes("usuario")}
                    label="Usuario*"
                    value={usuario}
                    onChange={updateFormData}
                />
                <TextField
                    name="senha"
                    error={errors.includes("senha")}
                    label="Senha*"
                    value={senha}
                    onChange={updateFormData}
                />
                
            </Box>
            <Typography sx={{ fontWeight: "medium" }}>Profissão</Typography>
            <Box>
                <FormControlLabel
                    control={
                        <Checkbox
                            name="Arquiteto"
                            color="error"
                            checked={checkbox === "Arquiteto"}
                            onClick={() => setCheckbox("Arquiteto")}
                            onChange={(e) => {
                                const { target } = e
                                updateFormData({
                                    ...e,
                                    target: {
                                        ...target,
                                        name: "profissao",
                                        value: e.target.name,
                                    }
                                })
                            }}
                        />
                    }
                    label="Arquiteto"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="Estudante"
                            color="error"
                            checked={checkbox === "Estudante"}
                            onClick={() => setCheckbox("Estudante")}
                            onChange={(e) => {
                                const { target } = e
                                updateFormData({
                                    ...e,
                                    target: {
                                        ...target,
                                        name: "profissao",
                                        value: e.target.name,
                                    }
                                })
                            }}

                        />
                    }
                    label="Estudante"
                />
            </Box>
            <ActionButtons handleCheckFields={handleAvancar} />
        </>
    );
}

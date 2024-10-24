import {
    Box,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { ActionButtons } from "../ActionButtons";
import { FormObjectProps } from "../../context/FormContext";
import { CpfMask, TelefoneMask } from "../MaskedInput";

interface DadosPessoaisProps extends Pick<FormObjectProps, 'nome' | 'email' | 'cpf' | 'orgEmissor' | 'ufDocumento' | 'celular' | 'fixo' | 'profissao'> {
    [key: string]: string | number | File | null | undefined;
}

export function DadosPessoais() {
    const [formValues, setFormValues] = useState<DadosPessoaisProps>({
        nome: "",
        email: "",
        cpf: "",
        orgEmissor: "",
        ufDocumento: "",
        celular: "",
        fixo: "",
        profissao: "Arquiteto",
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
        const requiredFields = [
            "nome",
            "email",
            "cpf",
            "celular",
        ];
        const newErrors = [];
        for (const field of requiredFields) {
            if (!formValues[field]) {
                newErrors.push(field);
            }
        }
        if (formValues.nome.length < 10) {
            newErrors.push("nome");
        }
        if (formValues.email.indexOf("@") === -1) {
            newErrors.push("email");
        }
        if (formValues.cpf.length < 14) {
            newErrors.push("cpf");
        }
        if (formValues.celular.length < 14) {
            newErrors.push("celular");
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
                <TextField
                    fullWidth
                    name="nome"
                    error={error.includes("nome")}
                    label="Nome Completo"
                    value={formValues.nome}
                    onChange={handleChange}
                />
            </Box>
            <Box>
                <TextField
                    fullWidth
                    name="email"
                    error={error.includes("email")}
                    label="Email"
                    value={formValues.email}
                    onChange={handleChange}
                />
            </Box>
            <Box>

                        <TextField
                            name="cpf"
                            error={error.includes("cpf")}
                            label="CPF"
                            sx={{ width: "50%", "@media (max-width: 600px)": { width: "100%"} }}
                            slotProps={{
                                input: {
                                    inputComponent: CpfMask as never,
                                }
                            }}
                        />
            </Box>
            <Box sx={{ display: "flex", gap: "2rem", "@media (max-width: 600px)": { flexDirection: "column" } }}>
                        <TextField
                            name="celular"
                            error={error.includes("celular")}
                            label="Celular"
                            slotProps={{
                                input: {
                                    inputComponent: TelefoneMask as never,
                                }
                            }}
                        />
                <TextField
                    name="fixo"
                    error={error.includes("fixo")}
                    label="Telefone Fixo - Opcional"
                    value={formValues.fixo}
                    onChange={handleChange}
                />
            </Box>
            <Typography sx={{ fontWeight: "medium" }}>Profissão</Typography>
            <Box>
                <FormControlLabel
                    control={
                        <Checkbox
                            color="error"
                            checked={formValues.profissao === "Arquiteto"}
                            onClick={() =>
                                setFormValues({ ...formValues, profissao: "Arquiteto" })
                            }
                        />
                    }
                    label="Arquiteto"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            color="error"
                            checked={formValues.profissao === "Estudante"}
                            onClick={() =>
                                setFormValues({ ...formValues, profissao: "Estudante" })
                            }
                        />
                    }
                    label="Estudante"
                />
            </Box>
            <ActionButtons handleCheckFields={handleAvancar} />
        </>
    );
}

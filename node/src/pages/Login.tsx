import { Box, Paper, TextField, Typography } from "@mui/material";
import logo from "../assets/logo.svg"

import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)({
    display: "flex",
    gap: "1.875rem",
    "@media (max-width: 600px)" : {
        flexDirection: "column"
    }
});

const StyledPaper = styled(Paper)({
    minHeight: "47.5rem",
    display: "flex",
    gap: "4rem",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
});

const Title = styled(Typography)({
    color: "#BF1515",
    fontWeight: "bold",
    fontSize: "2rem",
});

const Text = styled(Typography)({
    color: "#333333",
    fontSize: "1.5rem",
    marginTop: "2.5rem",
    fontWeight: "bold",
});



export function Login() {
    return (
        <StyledBox>
            <StyledPaper>
                <Title variant="h4">
                    Apenas alguns cliques para <br /> tornar-se um associado!
                </Title>
                <img src={logo} alt="" />
                <Text variant="body1">
                    Faça parte e aproveite todos os benefícios que o IAB Sergipe te proporciona!
                </Text>
            </StyledPaper>
            <StyledPaper>
                <Title variant="h4">
                    LOGIN DO ASSOCIADO
                </Title>
                <TextField size="small" placeholder="CPF"/>
                <TextField size="small" placeholder="Senha"/>
            </StyledPaper>
        </StyledBox>
    );
}

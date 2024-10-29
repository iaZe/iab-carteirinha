import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import logo from "../assets/logo.svg"

import { styled } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";

const StyledBox = styled(Box)({
    display: "flex",
    gap: "1.875rem",
    "@media (max-width: 600px)": {
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
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    paddingTop: "4rem",
    paddingBottom: "2rem",
    width: "50%",
    "@media (max-width: 600px)": {
        minHeight: "35rem",
        gap: "1.875rem",
        width: "90%",
        paddingLeft: "1rem",
        paddingRight: "1rem",
    }
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
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: "1rem",
                    marginTop: "2rem",
                    marginBottom: "2rem",
                    flexGrow: 1,
                    width: "80%",
                    "@media (max-width: 600px)": {
                        width: "100%"
                    }
                }}>

                    <Title variant="h4">
                        Apenas alguns cliques para <br /> tornar-se um associado!
                    </Title>
                    <img width="120px" src={logo} alt="" />
                    <Text variant="body1">
                        Faça parte e aproveite todos os benefícios que o IAB Sergipe te proporciona!
                    </Text>
                </Box>
            </StyledPaper>
            <StyledPaper>
                <Title variant="h4">
                    LOGIN DO ASSOCIADO
                </Title>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "80%",
                        justifyContent: "space-between",
                        gap: "1rem",
                        marginTop: "2rem",
                        marginBottom: "2rem",
                        flexGrow: 1,

                    }}
                >

                    <TextField size="small" placeholder="CPF" />
                    <TextField size="small" placeholder="Senha" />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Button variant="outlined" color="error">
                            Entrar
                        </Button>
                        <Link
                            sx={{
                                fontWeight: "medium",
                                color: "#BF1515",
                                textDecoration: "none",
                                "&:hover": {
                                    textDecoration: "underline"
                                }
                            }}
                            component={RouterLink}
                            to={"/recuperar-senha"}
                        >
                            Esqueci a senha
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            marginTop: "auto",
                            fontWeight: "medium",
                            fontSize: "large"
                        }}

                    >
                        {"Não é associado? "}
                        <Link
                            sx={{
                                color: "#BF1515",
                                textDecoration: "none",
                                "&:hover": {
                                    textDecoration: "underline"
                                }
                            }}
                            component={RouterLink}
                            to={"/cadastro"}
                        >
                            Clique aqui
                        </Link>
                    </Box>
                </Box>
            </StyledPaper>
        </StyledBox>
    );
}

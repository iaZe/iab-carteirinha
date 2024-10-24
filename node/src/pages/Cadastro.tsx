import { Box, Paper, styled, Typography, Slide } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { DadosPessoais } from "../components/Cadastro/DadosPessoais";
import { EnderecoPessoal } from "../components/Cadastro/EnderecoPessoal";
import { FormContext } from "../context/FormContext";
import { EnderecoComercial } from "../components/Cadastro/EnderecoComercial";
import { InformacoesExtras } from "../components/Cadastro/InformacoesExtras";

const StyledTitle = styled(Typography)({
  fontSize: "2rem",
  color: "#BF1515",
});

const StyledSubtitle = styled(Typography)({
  fontSize: "1rem",
  color: "#BF1515",
});

const StyledPaper = styled(Paper)({
  maxWidth: "900px",
  paddingLeft: "2.5rem",
  paddingRight: "2.5rem",
  paddingTop: "2rem",
  paddingBottom: "2rem",
  display: "flex",
  flexDirection: "column",
});

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1.75rem",
  marginTop: "3rem",
});

const steps = [
  {
    title: "Dados Pessoais",
    component: <DadosPessoais />,
  },
  {
    title: "Endereço Pessoal",
    component: <EnderecoPessoal />,
  },
  {
    title: "Endereço Comercial",
    component: <EnderecoComercial />,
  },
  {
    title: "Informações Extras",
    component: <InformacoesExtras />,
  },
];

export function Cadastro() {
  const { currentPage } = useContext(FormContext);
  const [checked, setChecked] = useState(true);
  const lastPageRef = useRef(currentPage); // Usando useRef para lastPage
  const [direction, setDirection] = useState<"left" | "right">("left");

  useEffect(() => {
    // avançando página
    if (lastPageRef.current > currentPage) {
      setDirection("left");
      setChecked(false);
      const timeout = setTimeout(() => {
        setDirection("right");
        setChecked(true);
      }, 500);
      lastPageRef.current = currentPage;

      return () => clearTimeout(timeout);
      // voltando página
    } else {
      setDirection("right");
      setChecked(false);
      const timeout = setTimeout(() => {
        setDirection("left");
        setChecked(true);
      }, 500);
      lastPageRef.current = currentPage;
      return () => clearTimeout(timeout);
    }
  }, [currentPage]);
  const { title, component } = steps[currentPage];

  {
    /*
    const isLogged = false; // TODO redirect
    if (isLogged) return <></>;
    */
  }

  return (
    <Slide
      direction={direction}
      in={checked}
      timeout={{ enter: 300, exit: 300 }}
      mountOnEnter
      unmountOnExit
    >
      <StyledPaper>
        <StyledTitle sx={{ fontWeight: "medium" }}>{title}</StyledTitle>
        {currentPage === 2 && (
          <StyledSubtitle sx={{ fontWeight: "medium" }}>
            (Opcional)
          </StyledSubtitle>
        )}
        <StyledBox>{component}</StyledBox>
      </StyledPaper>
    </Slide>
  );
}

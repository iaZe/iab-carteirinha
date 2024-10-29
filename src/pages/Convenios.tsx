import { Box, styled, Typography } from "@mui/material";
import { Categorias } from "../components/Categorias";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ConveniosImages from "../components/ConveniosImages";
import { StyledTitle } from "../components/Styled/StyledTitle";
import { StyledText } from "../components/Styled/StyledText";


const StyledSubtitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "bold",
});

const BulletPoint = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "1rem",
})

const UpperContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "2rem",
  marginBottom: "2rem",
  gap: "4rem"
})

const LowerContainer = styled(Box)({

});

export function Convenios() {
  return (
    <>
    <UpperContainer>
      <Box maxWidth="27rem">
        <Typography variant="h4">Rede de Parcerias IAB-SE</Typography>
        <Box>
          <BulletPoint>
            <ArrowForwardIcon color="error" />
            <StyledSubtitle>O que é?</StyledSubtitle>
          </BulletPoint>
          <Typography>
            Oferecimento de descontos e serviços para os associados em diversos
            estabelecimentos
          </Typography>
        </Box>
        <Box>
          <BulletPoint>
            <ArrowForwardIcon color="error" />
            <StyledSubtitle>Quais são os parceiros?</StyledSubtitle>
          </BulletPoint>
          <Typography>
            Varias opções de marcas e lojas parceiras podem ser vistas em nosso
            site iab.parceirias.com
          </Typography>
        </Box>
        <Box>
          <BulletPoint>
            <ArrowForwardIcon color="error" />
            <StyledSubtitle>Como funciona?</StyledSubtitle>
          </BulletPoint>
          <Typography>
            Cada parceiro tem uma dinâmica própria para beneficiar nossos
            participantes. Nas lojas virtuais, para usar os descontos será
            necessário utilizar o código de desconto disponibilizado na
            descrição da oferta ou através dos links exclusivos. Em algumas
            lojas físicas, será necessário apresentar um voucher ou
            identificação no momento da compra.
          </Typography>
        </Box>
      </Box>



      <Box>
      <Typography variant="h4">Categorias</Typography>
      <Typography variant="body1">A Rede de Parcerias IAB oferece descontos nas seguintes categorias:</Typography>

        <Categorias />
      </Box>
    </UpperContainer>
    <LowerContainer>
      <StyledTitle>Outros Convênios</StyledTitle>
      <StyledText>Além da rede de parcerias IAB, todas as empresas mostradas abaixo são conveniadas ao IAB/SE  e  também oferecem descontos e/ou outras facilidades aos associados. Essa página vai sendo atualizada conforme novas parcerias são fechadas.
      Passe o mouse por cima das imagens para ver os nomes das empresas. Clique para ir à página do Facebook de cada uma delas.</StyledText>
      <ConveniosImages />
      <StyledText>Para maiores informações acerca dos descontos ofertados, contate-nos via e-mail: iabse@outlook.com.</StyledText>
    </LowerContainer>
    </>
  );
}

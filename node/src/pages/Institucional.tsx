import { Box, styled } from "@mui/material";
import { StyledTitle } from "../components/Styled/StyledTitle";
import { StyledText } from "../components/Styled/StyledText";


const MainContainer = styled(Box)({
    marginLeft: "15rem",
    marginRight: "15rem",
});

const TextContainer = styled(Box)({
    maxWidth:"50rem",
    margin: "auto"
});

export function Institucional() {
    return (
        <MainContainer>
            <StyledTitle>
                Instituto de Arquitetos do Brasil. Departamento de Sergipe - IAB-SE
            </StyledTitle>
            <TextContainer>
                <StyledText>
                    O Instituto de Arquitetos do Brasil (IAB), fundado no Rio de Janeiro
                    em 26 de janeiro de 1921, é uma entidade sem fins lucrativos de livre
                    associação, que congrega arquitetos unidos em torno de um objetivo
                    principal: “O contínuo aprimoramento da arquitetura feita no Brasil,
                    em defesa e em benefício do ambiente de vida de todos os que aqui
                    habitam, em defesa e em benefício das paisagens urbanas e não urbanas
                    do país, as quais constituem elementos essenciais da cultura nacional,
                    sendo patrimônios inestimáveis da população brasileira”. A busca desse
                    objetivo é o elemento que dá sustentação e sentido a quaisquer ações e
                    iniciativas do IAB, seja no campo da defesa do digno exercício
                    profissional da arquitetura e dos seus princípios éticos mais
                    elevados, seja no campo do ensino da arquitetura e de sua divulgação
                    entre pessoas não diretamente ligadas ao exercício dessa profissão.O
                    IAB adotou o modelo federativo de organização e conta com
                    Departamentos autônomos em todos estados do país. A entidade é
                    liderada pela Direção Nacional, responsável pela articulação e pela
                    coordenação dos Departamentos, bem como pelas ações de abrangência
                    nacional e internacional. Por meio da Direção Nacional, o IAB se faz
                    representar nos órgãos da administração federal e se vincula a
                    entidades internacionais, com destaque para a União Internacional de
                    Arquitetos (UIA), órgão consultivo da UNESCO para assuntos relativos
                    ao habitat e à qualidade do espaço construído, a Federação
                    Pan-Americana de Associações de Arquitetos (FPAA) e o Conselho
                    Internacional de Arquitetos de Língua Portuguesa (CIALP). O IAB
                    integra o Colegiado das Entidades Nacionais de Arquitetura e Urbanismo
                    (CEAU), órgão consultivo da estrutura do Conselho de Arquitetura e
                    Urbanismo do Brasil (CAU/BR); e faz parte do Colégio Brasileiro de
                    Arquitetos (CBA), coletivo das entidades nacionais de arquitetura e
                    urbanismo.
                </StyledText>
            </TextContainer>
            <StyledTitle>História</StyledTitle>
            <TextContainer>
                <StyledText>
                    O Instituto de Arquitetos do Brasil (IAB), fundado no Rio de Janeiro
                    em 26 de janeiro de 1921, é uma entidade sem fins lucrativos de livre
                    associação, que congrega arquitetos unidos em torno de um objetivo
                    principal: “O contínuo aprimoramento da arquitetura feita no Brasil,
                    em defesa e em benefício do ambiente de vida de todos os que aqui
                    habitam, em defesa e em benefício das paisagens urbanas e não urbanas
                    do país, as quais constituem elementos essenciais da cultura nacional,
                    sendo patrimônios inestimáveis da população brasileira”. A busca desse
                    objetivo é o elemento que dá sustentação e sentido a quaisquer ações e
                    iniciativas do IAB, seja no campo da defesa do digno exercício
                    profissional da arquitetura e dos seus princípios éticos mais
                    elevados, seja no campo do ensino da arquitetura e de sua divulgação
                    entre pessoas não diretamente ligadas ao exercício dessa profissão.O
                    IAB adotou o modelo federativo de organização e conta com
                    Departamentos autônomos em todos estados do país. A entidade é
                    liderada pela Direção Nacional, responsável pela articulação e pela
                    coordenação dos Departamentos, bem como pelas ações de abrangência
                    nacional e internacional. Por meio da Direção Nacional, o IAB se faz
                    representar nos órgãos da administração federal e se vincula a
                    entidades internacionais, com destaque para a União Internacional de
                    Arquitetos (UIA), órgão consultivo da UNESCO para assuntos relativos
                    ao habitat e à qualidade do espaço construído, a Federação
                    Pan-Americana de Associações de Arquitetos (FPAA) e o Conselho
                    Internacional de Arquitetos de Língua Portuguesa (CIALP). O IAB
                    integra o Colegiado das Entidades Nacionais de Arquitetura e Urbanismo
                    (CEAU), órgão consultivo da estrutura do Conselho de Arquitetura e
                    Urbanismo do Brasil (CAU/BR); e faz parte do Colégio Brasileiro de
                    Arquitetos (CBA), coletivo das entidades nacionais de arquitetura e
                    urbanismo.
                </StyledText>
            </TextContainer>
            <StyledTitle>Diretoria do IAB-SE. Gestão 2023/2025 </StyledTitle>
            <TextContainer>
                <StyledText sx={{
                    marginBottom: "2rem"
                }}>
                    O Instituto hoje é composto com a seguinte diretoria:
                </StyledText>
                <Box display="flex">

                    <StyledText>
                        Diretoria Executiva: Elso de Freitas Moisinho Filho - Presidente José
                        Wlamir Soares- Vice-Presidente Edjane Bispo - 1ª Secretária Rodrigo
                        Costa - 2.º Secretário Clarissa da Silva Maia de Souza - 1ª Tesoureira
                        Camila de Castro Maia - 2º Tesoureira Conselho Fiscal Titular: Milena
                        Fontes Eduina França Mariele Rodrigues
                    </StyledText>
                    <StyledText>
                        Conselho Fiscal Suplente: Flávio Novais Eric Estevão Alice Garcez de
                        Castro Dória Conselho Superior Titular: Renata Dantas Rosário Sachs
                        Flávia Cristina Hassan Saldanha Ricardo Soares Mascarello Conselho
                        Superior Suplente: José Queiroz da Costa Filho Jerônimo Maynart
                        Sobrinho José Wellington Costa
                    </StyledText>
                </Box>
            </TextContainer>
        </MainContainer>
    );
}

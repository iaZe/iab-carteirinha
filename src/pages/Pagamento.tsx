import { useState } from "react";
import { Box, Paper, styled, Typography, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";
import { StyledTitle } from "../components/Styled/StyledTitle";

const StyledPaper = styled(Paper)({
    maxWidth: "900px",
    minHeight: "600px",
    paddingLeft: "2.5rem",
    paddingRight: "2.5rem",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    display: "flex",
    flexDirection: "column",
});


const StyledText = styled(Typography)({
    fontSize: "1.25rem",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#00000099",
});

const StyledBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "15.625rem",
});

const ConcludeButton = styled(Button)({
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "4rem",
});

export function Pagamento() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(chavePixMock).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        });
    };

    const chavePixMock =
        "00020126330014br.gov.bcb.pix01111335366962052040000530398654040.805802BR5919NOME6014CIDADE62580520LKH2021102118215467250300017br.gov.bcb.brcode01051.0.063044D24";

    return (
        <StyledPaper>
            <StyledTitle sx={{ fontWeight: "medium" }}>Pagamento</StyledTitle>
            <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
                fugit earum sint ullam aperiam quia nesciunt obcaecati culpa consequatur
                doloremque consectetur nihil commodi cupiditate, a amet soluta
                doloribus, vitae numquam.
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: "1.75rem",
                    marginTop: "7rem",
                    justifyContent: "space-around",
                }}
            >
                <StyledBox>
                    <StyledText sx={{ fontWeight: "medium" }}>Qrcode</StyledText>
                    {
                        // <img src={qrcode} />
                    }
                </StyledBox>
                <StyledBox>
                    <StyledText sx={{ fontWeight: "medium" }}>Código pix</StyledText>
                    <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
                        {chavePixMock}
                    </Typography>
                    <Button
                        onClick={handleCopy}
                        sx={{ mx: "auto", mt: "1rem" }}
                        variant="outlined"
                        color="error"
                    >
                        {copied ? (
                            <>
                                Feito <CheckIcon sx={{ ml: "0.5rem" }} />
                            </>
                        ) : (
                            <>
                                Copiar <ContentCopyIcon sx={{ ml: "0.5rem" }} />
                            </>
                        )}
                    </Button>
                </StyledBox>
            </Box>

            <ConcludeButton color="error" variant="contained">
                <Link style={{ color: "white", textDecoration: "none"}} to={"/aguardando-confirmacao"}>Já realizei o pagamento</Link>
            </ConcludeButton>
        </StyledPaper>
    );
}

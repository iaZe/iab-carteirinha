import { Box, Link, styled, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const StyledTypography = ({ children }: { children: React.ReactNode }) => {
    return (
        <Typography
            sx={{
                maxWidth: "16.75rem",
                fontWeight: "medium",
            }}
        >
            {children}
        </Typography>
    );
};

const VerticalBar = styled(Box)({
    width: "1px",
    height: "75%",
    backgroundColor: "white",
    borderRadius: "0.1rem",
});

export function Footer() {
    return (
        <Box
            sx={{
                backgroundColor: "#AA0000",
                display: "flex",
                justifyContent: "space-between",
                px: "2.375rem",
                py: "0.875rem",
                "@media (max-width: 600px)": {
                    px: "1rem",
                    flexDirection: "column",
                    gap: "1rem",
                }
            }}
        >
            <Box>
                <StyledTypography>iabse@outlook.com</StyledTypography>
                <StyledTypography>Av. Barão de Maruim, 115, <br /> B. São José - Aracaju/Se</StyledTypography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: "0.75rem",
                    }}
                >
                    <Link
                        sx={{ color: "white" }}
                        href="https://www.instagram.com/iab.se/"
                    >
                        <InstagramIcon sx={{ fontSize: "2rem"}} />
                    </Link>
                    <Link
                        sx={{ color: "white" }}
                        href="http://www.facebook.com/iab.sergipe"
                    >
                        <FacebookIcon sx={{ fontSize: "2rem"}} />
                    </Link>
                </Box>
                <VerticalBar />
                <Box>
                    <StyledTypography>
                        Instituto de Arquitetos do Brasil. Departamento de Sergipe.
                    </StyledTypography>
                </Box>
            </Box>
        </Box>
    );
}

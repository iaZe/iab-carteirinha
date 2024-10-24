import { Email, WhatsApp } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';
import clock from '../assets/clock.svg'
import { Link } from 'react-router-dom';



export default function AguardandoConfirmacao() {
    return (
        <Box sx={{color: "black"}}>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh"}}>
                <img width="160px" src={clock} alt="clock" />
            <Typography sx={{fontSize: 24, fontWeight: "medium"}}>Aguarde enquanto verificamos seu pagamento</Typography>
            <Typography sx={{fontWeight: "medium"}}>Em caso de dúvida, entrar em contato através dos canais abaixo:</Typography>
            <Box sx={{display: "flex", gap: "0.75rem", mt: "1rem", mb: "0.5rem"}}>
                <Link style={{color: "inherit", textDecoration: "none"}} to={"https://wa.me/5579996828255"}>
                <WhatsApp />
                </Link>
                <Typography>(79) 9 9682-8255</Typography>
            </Box>
            <Box sx={{display: "flex", gap: "0.75rem"}}>
                <Link style={{color: "inherit", textDecoration: "none"}} to={"mailto:iabse@outlook.com"}>
                <Email />
                </Link>
                <Typography>iabse@outlook.com</Typography>
            </Box>
            </Box>
        </Box>
    )
}

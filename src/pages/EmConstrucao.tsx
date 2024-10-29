import ConstructionIcon from '@mui/icons-material/Construction';
import { Box, Typography } from '@mui/material';


export function EmConstrucao() {
  return (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            backgroundColor: '#F5F5F5',
            color: '#666666',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Poppins',
            fontWeight: 500,
            letterSpacing: '0.05rem'
        }}
    >
        <Typography>
            <ConstructionIcon sx={{ fontSize: '5rem'  }} />
            A página está em construção. Por favor, tente novamente mais tarde.
        </Typography>
    </Box>
  )
}

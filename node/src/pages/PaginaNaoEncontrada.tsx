import { Box, Typography } from "@mui/material";

export function PaginaNaoEncontrada() {
  return (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            textAlign: "center",
            color: "black"
        }}
    >
        <Typography sx={{
            fontSize: 24,
            fontWeight: "medium"
        }}>
            404
        </Typography>
        <Typography variant="h5" sx={{
            marginTop: 16,
            marginBottom: 16,
            fontWeight: "bold"
        }}>
            Página não encontrada
        </Typography>
        <Typography sx={{
            marginTop: 16,
            marginBottom: 16,
            fontWeight: "medium"
        }}>
            Infelizmente, a página que você está procurando não existe.
        </Typography>
    </Box>
  )
}

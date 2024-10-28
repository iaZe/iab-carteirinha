import { Box, CircularProgress } from "@mui/material";

export function LoadingOverlay() {
  return (
    <Box
        sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 100,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            transition: "opacity 0.3s ease-in-out",
            opacity: 1,
            visibility: "visible",
            pointerEvents: "none"
        }}
    >
        <CircularProgress 
            sx={{
                color: "white",
                size: 120,
                animationDuration: "5s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite"
            }}
        />
    </Box>
  )
}

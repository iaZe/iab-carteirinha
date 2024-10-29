import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { FormContext } from "../context/FormContext";

interface ActionButtonsProps {
    handleCheckFields: () => boolean;
}

export function ActionButtons({ handleCheckFields }: ActionButtonsProps) {
    const { goToPreviousPage, goToNextPage, currentPage } = useContext(FormContext);

    const handleClickAvancar = () => {
        if (handleCheckFields()) {
            goToNextPage();
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "end",
                gap: "3rem",
                marginTop: "3.25rem",
            }}
        >
            {currentPage > 0 && (
                <Button variant="outlined" color="inherit" onClick={goToPreviousPage}>
                    Voltar
                </Button>
            )}
            <Button variant="contained" color="error" onClick={handleClickAvancar}>
                Avançar
            </Button>
        </Box>
    );
}

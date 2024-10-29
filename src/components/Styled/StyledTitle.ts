import { styled, Typography } from "@mui/material";

export const StyledTitle = styled(Typography)({
    fontSize: "2rem",
    color: "#BF1515",
    marginBottom: "2rem",
    ":not(:first-child)": {
        marginTop: "4rem",
    }
});

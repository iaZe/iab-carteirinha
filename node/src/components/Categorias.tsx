import { Box, Grid2, Typography } from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MopedIcon from "@mui/icons-material/Moped";
import ChairIcon from "@mui/icons-material/Chair";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import RedeemIcon from "@mui/icons-material/Redeem";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import PetsIcon from "@mui/icons-material/Pets";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import SchoolIcon from "@mui/icons-material/School";
import CheckroomIcon from "@mui/icons-material/Checkroom";


const icons = [
    {
        title: "Entreterimento",
        icon: <TheaterComedyIcon sx={{ fontSize: "5rem" }} />
    },
    {
        title: "Decoração",
        icon: <ChairIcon sx={{ fontSize: "5rem" }} />
    },
    {
        title: "Eletrônicos",
        icon: <PhoneAndroidIcon sx={{ fontSize: "5rem" }} />
    },
    {
        title: "Eletrodomésticos",
        icon: <LocalLaundryServiceIcon sx={{ fontSize: "5rem" }} />
    },
    {
        title: "Esportes",
        icon: <TheaterComedyIcon sx={{ fontSize: "5rem" }} />
    },
    {
        title: "Beleza",
        icon: <ContentCutIcon sx={{ fontSize: "5rem" }} />
    },
    {
        title: "Delivery",
        icon: <MopedIcon sx={{ fontSize: "5rem" }} />
    },
    {
        title: "Educação",
        icon: <SchoolIcon sx={{ fontSize: "5rem" }} />
    },
    {
        title: "Automotivo",
        icon: <DirectionsCarIcon sx={{ fontSize: "5rem" }} />
    },
    {
        title: "Presentes",
        icon: <RedeemIcon sx={{ fontSize: "5rem" }} />
    },
    {
        title: "Serviços",
        icon: <HomeRepairServiceIcon sx={{ fontSize: "5rem" }} />
    },
    {
        title: "Viagens",
        icon: <FlightTakeoffIcon sx={{ fontSize: "5rem" }} />
    },
    {
        title: "Petshop",
        icon: <PetsIcon sx={{ fontSize: "5rem" }} />
    },
    {
        title: "Moda",
        icon: <CheckroomIcon sx={{ fontSize: "5rem" }} />
    },
    {
        title: "Livros",
        icon: <MenuBookIcon sx={{ fontSize: "5rem" }} />
    },
    {
        title: "Gastrônomia",
        icon: <RestaurantIcon sx={{ fontSize: "5rem" }} />
    },
]

export function Categorias() {
    return (
        <Grid2 container columns={4} spacing={2} maxWidth="40rem">
            {
                icons.map((item) => {
                    const { title, icon } = item
                    return (<Grid2 size={1}>
                        <Box
                            sx={{
                                backgroundColor: "#E40000",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "0.5rem",
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                borderRadius: "0.5rem",
                                maxWidth: "8rem"
                            }}
                        >
                            {icon}
                            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                                {title}
                            </Typography>
                        </Box>
                    </Grid2>)
                })
            }
        </Grid2>

    )
}

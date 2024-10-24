import { Box, styled } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const StyledNavbar = styled(Box)({
    backgroundColor: "#AA0000",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    display: "flex",
    justifyContent: "center",
    gap: "2.5rem",
    "@media (max-width: 600px)": {
        transition: "visibility 2s",
        flexDirection: "column",
        alignItems: "center",
        position: "fixed",
        gap: "3rem",
    }
})

const links = [
    { label: "Página Inicial", url: "/" },
    { label: "Institucional", url: "/institucional" },
    // { label: "Eventos", url: "/eventos" },
    // { label: "Concursos", url: "/concursos" },
    { label: "Convênios", url: "/convenios" },
    // { label: "Notícias", url: "/noticias" },
    { label: "Login", url: "/login" },
];

const menuHoverStyles = {
    "@media (max-width: 600px)": {
        display: "flex",
        width: "100%",
        height: "100%",
        zIndex: 10,
        visibility: "100%"
    }
}

const menuStyles = {
    "@media (max-width: 600px)": {
        visibility: "0%",
        display: "none"
    }
}

export function Navbar({ isMenuOpen }: { isMenuOpen: boolean }) {
    const { pathname } = useLocation();
    return (
        <StyledNavbar
            sx={isMenuOpen ? menuHoverStyles : menuStyles}
        >
            {links.map(({ label, url }) => (
                <NavLink
                    to={url}
                    className={`${styles.navbutton} ${pathname === url ? styles.active : ""
                        }`}
                >
                    {label}
                </NavLink>
            ))}
        </StyledNavbar>
    );
}

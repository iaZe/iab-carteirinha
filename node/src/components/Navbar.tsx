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
    { label: "Página Inicial", url: "#" },
    { label: "Institucional", url: "#" },
    { label: "Eventos", url: "#" },
    { label: "Concursos", url: "#" },
    { label: "Convênios", url: "#" },
    { label: "Notícias", url: "#" },
    { label: "Associe-se", url: "#" },
];

const menuOpenStyles = {
    "@media (max-width: 600px)": {
        display: "flex",
        width: "100%",
        height: "100%",
        zIndex: 10,
        visibility: "100%"
    }
}

const closedMenuStyles = {
    "@media (max-width: 600px)": {
        visibility: "0%",
        display: "none"
    }
}

export function Navbar({ isMenuOpen }) {
    const { pathname } = useLocation();
    return (
        <StyledNavbar
            sx={isMenuOpen ? menuOpenStyles : closedMenuStyles}
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
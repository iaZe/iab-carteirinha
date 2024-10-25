import { Box, Link, styled } from "@mui/material";
import { Link as RouterLink, NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../assets/image10.png";

const StyledNavbar = styled(Box)({
    backgroundColor: "#AA0000",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
    "@media (max-width: 600px)": {
        transition: "all 0.2s",
        flexDirection: "column",
        alignItems: "center",
        position: "fixed",
        gap: "3rem",
    },
});

const StyledLink = styled(Link)({
    color: "white",
    textDecoration: "none",
});

const links = [
    { label: "Página Inicial", url: "/" },
    // { label: "Eventos", url: "/eventos" },
    { label: "Concursos", url: "/concursos" },
    { label: "Convênios", url: "/convenios" },
    { label: "Institucional", url: "/institucional" },
    // { label: "Notícias", url: "/noticias" },
    { label: "Login", url: "/login" },
];

const menuHoverStyles = {
    "@media (max-width: 600px)": {
        display: "flex",
        width: "100%",
        height: "100%",
        zIndex: 10,
    },
};

const menuStyles = {
    "@media (max-width: 600px)": {
        display: "flex",
        zIndex: 10,
        width: "100%",
        height: "4%",
    },
};

export function Navbar({ isMenuOpen }: { isMenuOpen: boolean }) {
    const { pathname } = useLocation();
    return (
        <StyledNavbar sx={isMenuOpen ? menuHoverStyles : menuStyles}>
            <Link
                to="/"
                component={RouterLink}
                className={styles.logo}
                sx={{
                    marginRight: "auto",
                    paddingLeft: "0.75rem",
                    opacity: isMenuOpen ? 0 : 1,
                    "@media (min-width: 600px)": {
                        display: "none" 
                    },
                }}
            >
                <img width={"50px"} src={logo} alt="Logo" />
            </Link>
            {links.map(({ label, url }) => (
                <StyledLink
                    sx={{
                        "@media (max-width: 600px)": {
                            display: isMenuOpen ? "block" : "none",
                        },
                    }}
                >
                    <NavLink
                        key={url}
                        to={url}
                        className={`${styles.navbutton} ${pathname === url ? styles.active : ""
                            }`}
                    >
                        {label}
                    </NavLink>
                </StyledLink>
            ))}
        </StyledNavbar>
    );
}

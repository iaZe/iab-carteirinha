import { Box } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MenuButton } from "./MenuButton";

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const [toggleMenu, setToggleMenu] = useState(false)
    useEffect(() => {
        if (toggleMenu) {
          setToggleMenu(true);
          document.body.style.overflow = 'hidden';
        } else {
          setToggleMenu(false);
          document.body.style.overflow = 'unset';
        }
      }, [toggleMenu]);
    return (
        <Box>
            <Navbar isMenuOpen={toggleMenu} />
            <MenuButton isMenuOpen={toggleMenu} handleToggleMenu={()=> setToggleMenu(!toggleMenu)} />
            <Box sx={{
                maxWidth: "75rem",
                mx: "auto",
                py: "3.5rem",
                "@media (max-width: 600px)": {
                paddingTop: "0",
                paddingBottom: "2rem"
                },
            }}>{children}</Box>
            <Footer/>
        </Box>
    );
}

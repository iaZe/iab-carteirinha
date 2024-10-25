import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@mui/material';



export function MenuButton({ isMenuOpen, handleToggleMenu }) {
  return (
    <Icon 
        component={isMenuOpen? CloseIcon: MenuIcon}
        onClick={handleToggleMenu}
        fontSize='large'
        sx={{
            zIndex: 11,
            position: "fixed",
            top: "1rem",
            right: "1.25rem",
            "@media (min-width: 600px)": {
                display: "none"
            }
        }}
    />
  )
}

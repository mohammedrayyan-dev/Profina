import { useState } from "react";
import { 
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ProfinaLogo from "/src/assets/ProfinaLogo.png"
import { Link, useLocation } from "react-router-dom"

const drawerWidth = 200;
const navItems = [
  { label: "Home", path: "/" },
  { label: "Profile", path: "/ProfilePage" },
  { label: "Manage", path: "/ManagePage"}
]

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List sx={{ pt: 2, px: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map((item) => (
  <ListItem key={item.label} disablePadding>
    <ListItemButton
      component={Link}
      to={item.path}
      selected={pathname === item.path}
    >
      <ListItemText primary={item.label} />
    </ListItemButton>
  </ListItem>
))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
          <Toolbar>

          {/* Mobile hamburger (Left) */}
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{ color: "secondary.contrastText" }} />
          </IconButton>

        {/* Logo + Title */}
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: { xs:"center", sm:"flex-start" }, 
          flexGrow: { xs: 0.8, sm: 0} }}
          >
          <img src={ProfinaLogo} alt="Logo" width = "40px" height= "40px" />
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: { xs: "25px" , sm: "24px" }, fontWeight: "bold", color: "primary.contrastText" }}
          >
            Profina
          </Typography>
          </Box>


          <Box sx={{ ml: "auto", my: "auto", display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 2 }}>
            {navItems.map((item) => (
              <Button 
              variant="navbarButtons"
              className={pathname === item.path ? "Mui-selected" : ""}
              key={item.label}
              component={Link}
              to={item.path}
              selected
              >
                {item.label}
              </Button>
            ))}
          </Box>
      </Toolbar>
      </AppBar>

       <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
 
  );
};

export default Navbar;

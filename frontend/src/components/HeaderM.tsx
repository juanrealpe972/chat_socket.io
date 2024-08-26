import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";

import { icono } from "./IconsAtom"
import CustomDrawer from "../themes/CustomDrawer";
import { Grid } from "@mui/material";
import ChatIcon from "./icons/ChatIcon";
import { UserContext } from "../context/UserContext";

export default function HeaderM() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const {selectedColor} = UserContext();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const miChat = () => {
    navigate('/dashboard/chat'); 
  }

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={"primary-search-account-menu-mobile"}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={miChat}>
        <IconButton size="large" aria-label="show 4 new mails" className="text-[#071013]">
        <Badge badgeContent={4} color="error">
          <icono.iconoMailIcon />
        </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          className="text-[#071013]"
        >
        <Badge badgeContent={17} color="error">
          <icono.iconoNotificationsIcon />
        </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          className="text-[#071013]"
        >
        <icono.iconoAccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={1}>
        <Toolbar className="bg-white" style={{ display: "flex", justifyContent:"center" }}>
          <Grid item xs={12} sm={6}>
            <ChatIcon color={selectedColor} className="cursor-pointer -mt-2" onClick={() => navigate('/dashboard')} />
          </Grid>
          <Typography
            variant="h6"
            noWrap
            className="text-[#071013] pl-2"
            component="div"
            onClick={() => navigate('/dashboard')}
            sx={{ display: { cursor: "pointer" } }}
          >
            RED
          </Typography>
          <Box sx={{ flexGrow: 1 }} />  
          <Box sx={{ display: { xs: "none", md: "flex" } }} className="flex items-center">
            <IconButton
              onClick={miChat}
              size="large"
              aria-label="show 4 new mails"
              className="text-[#071013]"
            >
              <Badge badgeContent={4} color="error">
                <icono.iconoMailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              className="text-[#071013]"
            >
              <Badge badgeContent={17} color="error">
                <icono.iconoNotificationsIcon />
              </Badge>
            </IconButton>
            <CustomDrawer/>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={"primary-search-account-menu-mobile"}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              className="text-[#071013]"
            >
              <icono.iconoMoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}

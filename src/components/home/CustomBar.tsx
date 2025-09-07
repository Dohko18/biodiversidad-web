import React, { MouseEvent, useState } from "react";
import { 
  AppBar, 
  Button, 
  Menu, 
  MenuItem, 
  Toolbar, 
  Typography,
  IconButton,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Box,
  TextField,
  InputAdornment,
  Badge
} from "@mui/material";
import { useSelector } from "react-redux";
import { UserStateModel } from "../user/_redux/userReducer";
import ModeNightIcon from '@mui/icons-material/ModeNight';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material';

interface HomeContentProps {
    toggleDrawer: () => void;
    switchMode: () => void;
    mode: "light" | "dark";
}

export default function CustomBar({ switchMode, toggleDrawer, mode }: HomeContentProps) {
    const theme = useTheme()
 
    const { user, result: userResult } = useSelector(
        ({ user }) => user
    ) as UserStateModel;
    
    const navigate = useNavigate();
    const [optionUser, setOptionUser] = useState<null | HTMLElement>(null);
    const [searchValue, setSearchValue] = useState("");

    const openOptionUser = (event: MouseEvent<HTMLButtonElement>) =>
        setOptionUser(event.currentTarget);

    const closeOptionUser = () => setOptionUser(null);

    const handleLogout = () => {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "/logout";
        document.body.appendChild(form);
        form.submit();
        closeOptionUser();
    };

    const handleModeSwitch = () => {
        switchMode();
        closeOptionUser();
    };

    const getUserInitials = () => {
        if (!user?.name || !user?.lastname) return "U";
        return `${user.name.charAt(0)}${user.lastname.charAt(0)}`.toUpperCase();
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: "background.default",
                borderBottom: `1px solid ${theme.palette.border.main}`,
                color: "t",
                top: 0,
                zIndex: theme => theme.zIndex.appBar,
            }}
        >
            <Toolbar 
                sx={{ 
                    minHeight: '48px !important',
                    paddingX: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2
                }}
            >
                {/* Sección izquierda: Menú móvil + Logo + Versión */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <IconButton
                        aria-label="abrir menú lateral"
                        edge="start"
                        onClick={toggleDrawer}
                        size="small"
                        sx={{ 
                            display: { xs: 'flex', sm: 'none' },
                            color: 'inherit'
                        }}
                    >
                        <MenuIcon fontSize="small" />
                    </IconButton>

                    {/* Logo */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box 
                            sx={{ 
                                width: 24, 
                                height: 24, 
                                backgroundColor: 'primary.main',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                color: 'white'
                            }}
                        >
                        </Box>
                        <Typography 
                            onClick={() => navigate("/")} 
                            variant="body2" 
                            component="div"
                            sx={{
                                fontWeight: 600,
                                cursor: "pointer",
                                color: "inherit",
                                fontSize: '20px'
                            }}
                        >
                            Capital Natural Oriente Antioqueño
                        </Typography>
                        <Typography 
                            variant="caption"
                            sx={{
                                color: mode === "dark" ? "#888" : "#666",
                                fontSize: '11px',
                                ml: 0.5
                            }}
                        >
                            v1.0.0
                        </Typography>
                    </Box>
                </Box>

                {/* Spacer para empujar elementos hacia la derecha */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Sección derecha: Buscador + Iconos + Usuario */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {/* Buscador */}
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <TextField
                            size="small"
                            placeholder="Buscar..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            sx={{ width: 300 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ fontSize: 18, color: mode === "dark" ? "#888" : "#666" }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Box 
                                            sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: 0.5,
                                                backgroundColor: mode === "dark" ? "#333" : "#f0f0f0",
                                                borderRadius: '4px',
                                                padding: '2px 6px',
                                                fontSize: '10px',
                                                color: mode === "dark" ? "#888" : "#666"
                                            }}
                                        >
                                            <KeyboardIcon sx={{ fontSize: 12 }} />
                                            ⌘K
                                        </Box>
                                    </InputAdornment>
                                ),
                                sx: {
                                    backgroundColor: mode === "dark" ? "#2a2a2a" : "#f8f9fa",
                                    borderRadius: 1,
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none'
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        border: 'none'
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        border: `1px solid ${mode === "dark" ? "#555" : "#ddd"}`
                                    },
                                    fontSize: '14px'
                                }
                            }}
                        />
                    </Box>
                    {/* GitHub */}
                    <IconButton 
                        size="small"
                        sx={{ color: 'inherit' }}
                        onClick={() => window.open('https://github.com', '_blank')}
                    >
                        <GitHubIcon fontSize="small" />
                    </IconButton>

                    {/* Notificaciones */}
                    <IconButton size="small" sx={{ color: 'primary' }}>
                        <Badge badgeContent={4} color="error" variant="dot">
                            <NotificationsIcon fontSize="small" />
                        </Badge>
                    </IconButton>

                    {/* Usuario */}
                    <Button
                        id="buttonMenuOptionUser"
                        aria-controls={Boolean(optionUser) ? "menuOptionUser" : undefined}
                        aria-haspopup="true"
                        aria-expanded={Boolean(optionUser) ? "true" : undefined}
                        onClick={openOptionUser}
                        size="small"
                        sx={{
                            textTransform: "none",
                            borderRadius: 1,
                            paddingX: 1,
                            paddingY: 0.5,
                            color: "inherit",
                            minWidth: 'auto',
                            '&:hover': {
                                backgroundColor: mode === "dark" ? "#333" : "#f0f0f0",
                            },
                        }}
                    >
                        <Avatar 
                            sx={{ 
                                width: 24, 
                                height: 24,
                                fontSize: '10px',
                                bgcolor: 'primary.main'
                            }}
                        >
                            {getUserInitials()}
                        </Avatar>
                    </Button>

                    <Menu
                        id="menuOptionUser"
                        anchorEl={optionUser}
                        open={Boolean(optionUser)}
                        onClose={closeOptionUser}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        slotProps={{
                            paper: {
                                elevation: 8,
                                sx: {
                                    mt: 0.5,
                                    minWidth: 180,
                                    borderRadius: 1,
                                    '& .MuiMenuItem-root': {
                                        paddingY: 1,
                                        paddingX: 1.5,
                                        fontSize: '14px',
                                        gap: 1,
                                        '&:hover': {
                                            backgroundColor: mode === "dark" ? "#333" : "#f0f0f0",
                                        }
                                    }
                                }
                            }
                        }}
                        MenuListProps={{
                            "aria-labelledby": "buttonMenuOptionUser",
                        }}
                    >
                        {/* Información del usuario */}
                        <Box sx={{ px: 1.5, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {user?.name} {user?.lastname}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {user?.email || 'usuario@ejemplo.com'}
                            </Typography>
                        </Box>

                        <MenuItem onClick={() => {
                            navigate('/profile');
                            closeOptionUser();
                        }}>
                            <ListItemIcon>
                                <PersonIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Perfil</ListItemText>
                        </MenuItem>

                        <MenuItem onClick={handleModeSwitch}>
                            <ListItemIcon>
                                {mode === "light" ? 
                                    <ModeNightIcon fontSize="small" /> : 
                                    <Brightness5Icon fontSize="small" />
                                }
                            </ListItemIcon>
                            <ListItemText>
                                {mode === "light" ? 'Modo Oscuro' : 'Modo Claro'}
                            </ListItemText>
                        </MenuItem>

                        <Divider />

                        <MenuItem 
                            onClick={handleLogout}
                            sx={{ 
                                color: 'error.main',
                                '&:hover': {
                                    backgroundColor: mode === "dark" ? "#4a1e1e" : "#fef2f2",
                                }
                            }}
                        >
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" sx={{ color: 'inherit' }} />
                            </ListItemIcon>
                            <ListItemText>Cerrar Sesión</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
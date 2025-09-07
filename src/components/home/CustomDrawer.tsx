import React, { Suspense, useEffect, useState } from "react";

import {
    Drawer,
    MenuItem,
    useTheme,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Box
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

import {
    ExpandLess,
    ExpandMore,
    Star,
    Payments,
    DoneAll,
    Face5,
    Settings,
    Person,
    Domain,
    RadioButtonUnchecked,
    Map,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export interface CustomDrawerProps {
    mobileOpen: boolean
    setMobileOpen: (value: boolean) => void
    drawerWidth: number;
}

const iconMap: Record<string, JSX.Element> = {
    star: <Star />,
    payments: <Payments />,
    doneAll: <DoneAll />,
    face5: <Face5 />,
    settings: <Settings />,
    person: <Person />,
    domain: <Domain />,
    radio_button_unchecked: <RadioButtonUnchecked />,
    map: <Map />,
};

const getIcon = (icon: string) => iconMap[icon] || <RadioButtonUnchecked />;

export const menus = [{
    name: "Configuración",
    menu: [
        { 
            name: 'Mapa', 
            icon: "map", 
            link: '/biodiversidad', 
            subMenu: [], 
            role: "maps.menu.view" },
        {
            name: 'Objetos',
            icon: "person",
            link: '/capabilities',
            subMenu: [
                { name: 'Objeto', icon: "radio_button_unchecked", link: '/objetos', subMenu: [], role: "maps.menu.view" },
                { name: 'Nuevo', icon: "radio_button_unchecked", link: '/objetos/nuevo', subMenu: [], role: "maps.menu.view" },
            ],
            role: ""
        },   
    ]
}]

export const CustomDrawer = ({ mobileOpen, setMobileOpen, drawerWidth }: CustomDrawerProps) => {
    const [open, setOpen] = useState<Record<string, boolean>>({});
    const handleClick = (id: string) => {
        setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    const theme = useTheme()
    const navigate = useNavigate();
    const [isClosing, setIsClosing] = useState(false);
    const [selected, setSelected] = useState<{ name: string; link: string } | null>(null);

    useEffect(() => {
        if (selected) {
            navigate(selected.link);
            handleDrawerClose();
        }
    }, [selected]);

    const drawer = (
        <Suspense fallback={<div>Loading...</div>}>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%',
                pt: { xs: 1, sm: 0 } // Padding top solo en móvil
            }}>
                {/* Lista principal de menús */}
                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                    <List>
                        {menus.map((group) =>
                            group.menu.map((menuItem) => (
                                <React.Fragment key={menuItem.name}>
                                    <ListItemButton 
                                        onClick={() => handleClick(menuItem.name)}
                                        sx={{
                                            borderRadius: 1,
                                            mx: 1,
                                            my: 0.5,
                                            '&:hover': {
                                                backgroundColor: theme.palette.mode === 'dark' 
                                                    ? 'rgba(255, 255, 255, 0.08)' 
                                                    : 'rgba(0, 0, 0, 0.04)'
                                            }
                                        }}
                                    >
                                        <ListItemIcon>{getIcon(menuItem.icon)}</ListItemIcon>
                                        <ListItemText primary={menuItem.name} />
                                        {menuItem.subMenu.length > 0 ? (
                                            open[menuItem.name] ? <ExpandLess /> : <ExpandMore />
                                        ) : null}
                                    </ListItemButton>
                                    {menuItem.subMenu.length > 0 && (
                                        <Collapse in={open[menuItem.name]} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {menuItem.subMenu.map((sub) => (
                                                    <ListItemButton
                                                        key={sub.name}
                                                        sx={{ 
                                                            pl: 5,
                                                            borderRadius: 1,
                                                            mx: 1,
                                                            my: 0.25,
                                                            '&:hover': {
                                                                backgroundColor: theme.palette.mode === 'dark' 
                                                                    ? 'rgba(255, 255, 255, 0.08)' 
                                                                    : 'rgba(0, 0, 0, 0.04)'
                                                            }
                                                        }}
                                                        onClick={() => setSelected({ name: sub.name, link: sub.link })}
                                                    >
                                                        <ListItemIcon>{getIcon(sub.icon)}</ListItemIcon>
                                                        <ListItemText primary={sub.name} />
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        </Collapse>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </List>
                </Box>
            </Box>
        </Suspense>
    );

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    return (
        <>
            {/* Drawer móvil */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box', 
                        width: drawerWidth, 
                        borderRight: "none",
                        backgroundColor: theme.palette.background.default,
                        marginTop: '48px', // Espacio para AppBar
                        height: 'calc(100vh - 48px)', // Altura total menos AppBar
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* Drawer permanente (desktop) */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box', 
                        width: drawerWidth, 
                        borderRight: "none",
                        backgroundColor: "transparent",
                        overflowX: 'hidden',
                        marginTop: '48px', // Espacio para AppBar
                        height: 'calc(100vh - 48px)', // Altura total menos AppBar
                    },
                }} 
                open
            >
                {drawer}
            </Drawer>
        </>
    )
}
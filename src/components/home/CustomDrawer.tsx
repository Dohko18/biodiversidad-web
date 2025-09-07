import React, { Suspense, useEffect, useState } from "react";

import {
    Drawer,
    MenuItem,
    useTheme,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse
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
};

const getIcon = (icon: string) => iconMap[icon] || <RadioButtonUnchecked />;

export const menus = [{
    name: "Configuración",
    menu: [
        {
            name: 'Biodiversidad',
            icon: "star",
            link: '/capabilities',
            subMenu: [
                { name: 'Mapa', icon: "radio_button_unchecked", link: '/biodiversidad', subMenu: [], role: "maps.menu.view" },
                { name: 'Nuevo', icon: "radio_button_unchecked", link: '/biodiversidad/nuevo', subMenu: [], role: "maps.menu.view" },
            ],
            role: ""
        },   
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
        navigate(selected?.link || '/');
        handleDrawerClose()
    }, [selected]);

    const drawer = (
        <Suspense fallback={<div>Loading...</div>}>
            <List>
                {menus.map((group) =>
                    group.menu.map((menuItem) => (
                        <React.Fragment key={menuItem.name}>
                            <ListItemButton onClick={() => handleClick(menuItem.name)}>
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
                                                sx={{ pl: 4 }}
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
        </Suspense>
    );

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const ExitButton = () => {
        return (
            <MenuItem
                onClick={() => {
                    const form = document.createElement("form");
                    form.method = "POST";
                    form.action = "/logout";
                    document.body.appendChild(form);
                    form.submit();
                }}
                sx={{
                    gap: 1,
                    backgroundColor: 'rgba(244, 67, 54, 0.1)', // rojo muy suave
                    color: 'error.main',
                    '&:hover': {
                        backgroundColor: 'rgba(244, 67, 54, 0.2)',
                    },
                }}
            >
                <LogoutIcon color="error" />
                Salir
            </MenuItem>
        );
    }

    return (<>
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
                    boxSizing: 'border-box', width: drawerWidth, borderRight: "none",
                    backgroundColor: theme.palette.background.default
                },
            }}>
            {drawer}
            {ExitButton()}
        </Drawer>
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block', width: drawerWidth },
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box', width: drawerWidth, borderRight: "none",
                    backgroundColor: "transparent",
                    overflowX: 'hidden'
                },
            }} open>
            {drawer}
            {ExitButton()}
        </Drawer>
    </>)
}
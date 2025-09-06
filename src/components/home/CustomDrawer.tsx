import React, { Suspense, useEffect, useState } from "react";

import { Drawer, MenuItem, useTheme } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export interface CustomDrawerProps {
    mobileOpen: boolean
    setMobileOpen: (value: boolean) => void
    drawerWidth: number;
}

export const menus = [{
    name: "Configuración",
    menu: [
        {
            name: 'Capacidades',
            icon: "star",
            link: '/capabilities',
            collapsed: true,
            subMenu: [
                { name: 'Crear o modificar', icon: "radio_button_unchecked", link: '/capabilities/list', subMenu: [], role: "maps.menu.view" },
                { name: 'Grupos', icon: "radio_button_unchecked", link: '/capabilities/groups', subMenu: [], role: "maps.menu.view" },
                { name: 'Flujos', icon: "radio_button_unchecked", link: '/auditflow', subMenu: [], role: "maps.menu.view" }
            ],
            role: ""
        },
        {
            name: 'Prestamos',
            icon: "payments",
            link: '/loans',
            subMenu: [
                { name: 'Dashboard', icon: "radio_button_unchecked", link: '/loans', subMenu: [], role: "maps.menu.view" },
                { name: 'Validar', icon: "radio_button_unchecked", link: '/loans/pending', subMenu: [], role: "maps.menu.view" },
                { name: 'Historico', icon: "radio_button_unchecked", link: '/loans/history', subMenu: [], role: "maps.menu.view" }
            ],
            role: ""
        },
        {
            name: 'Desembolsos',
            icon: "paids",
            link: '#',
            subMenu: [
                { name: 'Aplicar', icon: "radio_button_unchecked", link: '/disbursements', subMenu: [], role: "maps.menu.view" }
            ],
            role: ""
        },
        {
            name: 'Validaciones',
            icon: "doneAll",
            link: '#',
            subMenu: [
                { name: 'Documentos de usuario', icon: "radio_button_unchecked", link: '/validations/bankAccount', subMenu: [], role: "maps.menu.view" },
                { name: 'Documentos', icon: "radio_button_unchecked", link: '/validations/documents/list', subMenu: [], role: "maps.menu.view" }
            ],
            role: ""
        },
        {
            name: 'Review',
            icon: "face5",
            link: '#',
            subMenu: [
                { name: 'Contact Us', icon: "radio_button_unchecked", link: '/reviews/contactus', subMenu: [], role: "maps.menu.view" },
                { name: 'Testimonials', icon: "radio_button_unchecked", link: '/reviews/testimonials', subMenu: [], role: "maps.menu.view" }
            ],
            role: ""
        },
        {
            name: 'General',
            icon: "settings",
            link: '#',
            subMenu: [
                { name: 'Dominios', icon: "domain", link: '/domains', subMenu: [], role: "maps.menu.view" }
            ],
            role: ""
        },
        {
            name: 'usuarios',
            icon: "person",
            link: '#',
            subMenu: [
                { name: 'Usuarios', icon: "person", link: '/users', subMenu: [], role: "maps.menu.view" }
            ],
            role: ""
        }
    ]
}]


export const CustomDrawer = ({ mobileOpen, setMobileOpen, drawerWidth }: CustomDrawerProps) => {

    const theme = useTheme()
    const [isClosing, setIsClosing] = useState(false);
    const [size, setSize] = useState(drawerWidth)
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        console.log("selected", selected)
        handleDrawerClose()
    }, [selected]);

    const drawer = (
        <Suspense fallback={<div>Loading...</div>}>
            <div>Pruebas</div>
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
        )
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
                display: { xs: 'none', sm: 'block', width: size },
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
import React, { CSSProperties, MouseEvent, useState } from "react";
import { AppBar, Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { UserStateModel } from "../user/_redux/userReducer";
import ModeNightIcon from '@mui/icons-material/ModeNight';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

interface HomeContentProps {
    toggleDrawer: () => void;
    switchMode: () => void;
    mode: "light" | "dark";
}

export default function CustomBar({ switchMode, toggleDrawer, mode }: HomeContentProps) {

    const { user, result: userResult } = useSelector(
        ({ user }) => user
    ) as UserStateModel;
    const navigate = useNavigate();
    const [optionUser, setOptionUser] = useState<null | HTMLElement>(null);

    const [notification, setNotification] = useState<null | HTMLElement>(null);

    const openOptionUser = (event: MouseEvent<HTMLButtonElement>) =>
        setOptionUser(event.currentTarget);

    const closeOptionUser = () => setOptionUser(null);

    const closeSelectedOptionUser = () => {
        closeOptionUser();
    };

    const closeNotification = () => setNotification(null);

    return (
        <AppBar
            color="transparent"
            position="sticky"
            sx={{
                boxShadow: "none",
                backdropFilter: "blur(20px)",
                top: 0,
                zIndex: (theme) => theme.zIndex.appBar
            }}
        >
            <Toolbar sx={{ paddingLeft: { xs: 2, sm: 31 } }}>
                <IconButton
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => {
                        toggleDrawer()
                    }}
                    sx={{ mr: 2, display: { sm: 'none' } }}>
                    <MenuIcon />
                </IconButton>

                <Typography onClick={() => navigate("/")} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Biodiversidad
                </Typography>

                <Button
                    id="buttonMenuOptionUser"
                    aria-controls={
                        Boolean(optionUser) ? "menuOptionUser" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={Boolean(optionUser) ? "true" : undefined}
                    onClick={openOptionUser}>
                    {user?.name} {user?.lastname}
                </Button>

                <Menu
                    id="menuOptionUser"
                    anchorEl={optionUser}
                    open={Boolean(optionUser)}
                    onClose={closeOptionUser}
                    MenuListProps={{
                        "aria-labelledby": "buttonMenuOptionUser",
                    }}>
                    <MenuItem style={{ gap: 8 }} onClick={() => switchMode()}>
                        {mode === "light" ? <ModeNightIcon /> : <Brightness5Icon />}
                        {mode === "light" ? 'Modo Oscuro' : 'Modo Claro'}
                    </MenuItem>

                    <MenuItem color={"primary"} style={{ gap: 8 }} onClick={() => {
                        const form = document.createElement("form");
                        form.method = "POST";
                        form.action = "/logout";
                        document.body.appendChild(form);
                        form.submit();
                    }}>
                        <LogoutIcon />
                        Salir
                    </MenuItem>
                </Menu>

                <Menu
                    id="menuNotification"
                    anchorEl={notification}
                    open={Boolean(notification)}
                    onClose={closeNotification}
                    MenuListProps={{ "aria-labelledby": "basic-button" }}>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

const styles = {
    bar: {
        zIndex: "1",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "auto auto",
        gap: "10px",
    } as CSSProperties,
    content: {
        width: "100%",
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
    } as CSSProperties,
};

import React, { CSSProperties, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useSelector } from "react-redux";
import { GlobalStore } from "redux-micro-frontend";
import HomeContent from "./HomeContent";
import { findUserReducer, findUserSuccessReducer, UserStateModel, } from "../user/_redux/userReducer";
import { isActionOf } from "../../core/redux/actions";
import { userFindAction } from "../user/_redux/userAction";
import { Box } from "@mui/material";
import CustomBar from "./CustomBar";
import { CustomDrawer } from "./CustomDrawer";

interface HomeProps {
    switchMode: () => void;
    mode: "light" | "dark";
}

export default function Home({ switchMode, mode }: HomeProps) {
    const globalStore = GlobalStore.Get();

    const { user, result: userResult } = useSelector(({ user }) => user) as UserStateModel;
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        if (isActionOf(userResult.action, findUserSuccessReducer)) {
            console.log(user);
        }
    }, [userResult]);

    const getPrincipal = () => {
        if (isActionOf(userResult.action, findUserReducer)) {
            return;
        }

        globalStore.DispatchAction("user", userFindAction());
    };

    useEffect(() => getPrincipal(), []);

    if (!user) return <div></div>;

    return (
        <Grid2
            container
            sx={{
                flexGrow: 1,
                height: "100%",
                alignItems: "flex-start",
                alignContent: "flex-start"
            }}
        >
            <CssBaseline />
            <CustomBar
                switchMode={switchMode}
                toggleDrawer={() => setMobileOpen(!mobileOpen)}
                mode={mode}
            />

            <CustomDrawer mobileOpen={mobileOpen} drawerWidth={240} setMobileOpen={(value: boolean) => {
                setMobileOpen(value)
            }} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: "100%",
                    overflow: "auto",
                }}
            >
                <HomeContent switchMode={switchMode} mode={mode} />
            </Box>
        </Grid2>
    );
}
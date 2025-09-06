import React, { CSSProperties } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

interface HomeContentProps {
    switchMode: () => void;
    mode: "light" | "dark";
}

export default function HomeContent({ switchMode, mode }: HomeContentProps) {
    return (
        <Box className="home-component"
            component="main"
            sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Box sx={{
                overflowX: "auto",
                width: "100%",
                marginLeft: {
                    xs: "null",
                    sm: "248px"
                },
                margin: {                    
                    xs: "16px",
                    sm: "none",
                }
            }}>
                <Outlet/>             
            </Box>
        </Box>
    );
}

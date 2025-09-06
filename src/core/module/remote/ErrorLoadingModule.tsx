import React from "react";
import {Alert} from "@mui/material";

export function ErrorLoadingModule({error, retry}: any) {

    return (
        <Alert severity={"error"}>
            Error al cargar el modulo
        </Alert>
    )
}
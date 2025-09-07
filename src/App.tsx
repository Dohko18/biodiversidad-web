import React, { Suspense, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Code404 from "./core/libraries/httpstatuscodes/Code404";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./theme/customPalette";
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";
import LinearProgressBar from "./components/home/linearprogress/LinearProgressBar";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";

import { setupCache } from "axios-cache-interceptor";
import Axios from "axios";
import BiodiversidadRoutes from "./components/biodiversidad/BiodiversidadRoutes";
import ObjetosRoutes from "./components/objetos/ObjetosRoutes";

setupCache(Axios, {
    debug: console.log,
});


const App = () => {
    const [actualTheme, setActualTheme] = useState<"light" | "dark">("dark");

    const theme = useMemo(
        () => (actualTheme === "light" ? lightTheme : darkTheme),
        [actualTheme]
    );

    const themeModeHandler = (mode?: "light" | "dark") => {
        mode ? setActualTheme(mode) : setActualTheme(actualTheme === "light" ? "dark" : "light");
    };


    return (
        <Provider store={store}>
            <HashRouter>
                <ThemeProvider theme={theme}>
                    <LinearProgressBar />
                    <Routes>
                        <Route path="/" element={<Home mode={actualTheme} switchMode={themeModeHandler} />}>
                            <Route path="/biodiversidad/*" element={
                                <Suspense fallback={"🌀 Loading"}>
                                    <BiodiversidadRoutes />
                                </Suspense>} />
                            <Route path="/objetos/*" element={
                                <Suspense fallback={"🌀 Loading"}>
                                    <ObjetosRoutes />
                                </Suspense>} />
                        </Route>
                        <Route path="*" element={<Code404 />} />
                    </Routes>
                    <ToastContainer theme={actualTheme} />
                </ThemeProvider>
            </HashRouter>
        </Provider>
    );
};

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<App />);

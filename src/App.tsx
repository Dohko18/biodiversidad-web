import React, { lazy, Suspense, useMemo, useState } from "react";
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
import { loadModule } from "./core/module/remote/load";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";

const LoanApprovalRoutes = React.lazy(() => loadModule('mcr_loan_approval_admin', './AppRoutes'))
const ReviewRoutes = React.lazy(() => loadModule('mcr_review_admin', './AppRoutes'))
const CapabilityRoutes = React.lazy(() => loadModule('mcr_capabilities_admin', './AppRoutes'))
const UserDocumentRoutes = React.lazy(() => loadModule('mcr_user_doc_validation_admin', './AppRoutes'))
const DisbursementRoutes = React.lazy(() => loadModule('mcr_disbursement_admin', './AppRoutes'))
const DomainRoutes = React.lazy(() => loadModule('mcr_domain_admin', './AppRoutes'))
const UserRoutes = React.lazy(() => loadModule('mcr_user_admin', './AppRoutes'))
const FLowAuditRoutes = React.lazy(() => loadModule('mcr_audit_flow_admin', './AppRoutes'))
import { setupCache } from "axios-cache-interceptor";
import Axios from "axios";

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
                            <Route path="/capabilities/*" element={
                                <Suspense fallback={"🌀 Loading"}>
                                    <CapabilityRoutes />
                                </Suspense>} />

                            <Route path="/domains/*" element={
                                <Suspense fallback={"🌀 Loading"}>
                                    <DomainRoutes />
                                </Suspense>} />

                            <Route path="/loans/*" element={
                                <Suspense fallback={"🌀 Loading"}>
                                    <LoanApprovalRoutes />
                                </Suspense>
                            } />
                            <Route path="/disbursements/*" element={
                                <Suspense fallback={"🌀 Loading"}>
                                    <DisbursementRoutes />
                                </Suspense>} />

                            <Route path="/validations/*" element={
                                <Suspense fallback={"🌀 Loading"}>
                                    <UserDocumentRoutes />
                                </Suspense>} />

                            <Route path="/reviews/*" element={
                                <Suspense fallback={"🌀 Loading"}>
                                    <ReviewRoutes />
                                </Suspense>} />

                            <Route path="/users/*" element={
                                <Suspense fallback={"🌀 Loading"}>
                                    <UserRoutes />
                                </Suspense>} />

                            <Route path="/auditflow/*" element={
                                <Suspense fallback={"🌀 Loading"}>
                                    <FLowAuditRoutes />
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

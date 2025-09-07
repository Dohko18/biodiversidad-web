import React, {Suspense} from 'react'
import {Route, Routes} from "react-router-dom";
import MapComponent from "./map/MapComponent";

export default function BiodiversidadRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <Suspense fallback={"🌀 Loading"}>
                        <MapComponent />
                    </Suspense>
                }>
                    <Route path=":id/new"
                        element={
                            <Suspense fallback={"🌀 Loading"}>
                                <h1>New Biodiversidad Entry</h1>
                            </Suspense>
                        } />
                </Route>
            </Routes>
        </>
    );
}

import React, {Suspense} from 'react'
import {Route, Routes} from "react-router-dom";
import { BiodiversidadMap } from './BiodiversidadMap/BiodiversidadMap';

export default function BiodiversidadRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <Suspense fallback={"🌀 Loading"}>
                        <BiodiversidadMap />
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

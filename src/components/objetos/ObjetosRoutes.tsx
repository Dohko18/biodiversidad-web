import React, {Suspense} from 'react'
import {Route, Routes} from "react-router-dom";
import { ObjetosListar } from './ObjetosListar/ObjetosListar';

export default function ObjetosRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <Suspense fallback={"🌀 Loading"}>
                        <ObjetosListar />
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

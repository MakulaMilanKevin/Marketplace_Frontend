import React from 'react';
import Kezdooldal from './pages/Kezdooldal';
import Bejelentkezes from './pages/Bejelentkezes';
import Regisztracio from './pages/Regisztracio';
import TermekFeltoltes from './pages/TermekFeltoltes';
import ProtectedRoute from './ProtectedRoute';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import TermekModositas from './pages/TermekModositas';

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Kezdooldal />} />
                <Route path="/bejelentkezes" element={<Bejelentkezes />} />
                <Route path="/regisztracio" element={<Regisztracio />} />
                <Route
                    path="/feltoltes"
                    element={
                        <ProtectedRoute>
                            <TermekFeltoltes />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/modositas"
                    element={
                        <ProtectedRoute>
                            <TermekModositas />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
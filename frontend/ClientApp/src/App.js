import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';

import DashboardPage from './pages/DashboardPage';
import MembersPage from './pages/MembersPage';
import AddMemberPage from './pages/AddMemberPage';
import EditMemberPage from './pages/EditMemberPage';
import LoginPage from './pages/LoginPage';

// componentă de protecție
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default function App() {
    return (
        <Layout>
            <Routes>
                {/* LOGIN */}
                <Route path="/login" element={<LoginPage />} />

                {/* DASHBOARD */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                {/* PACIENȚI */}
                <Route
                    path="/members"
                    element={
                        <ProtectedRoute>
                            <MembersPage />
                        </ProtectedRoute>
                    }
                />

                {/* ADD */}
                <Route
                    path="/members/add"
                    element={
                        <ProtectedRoute>
                            <AddMemberPage />
                        </ProtectedRoute>
                    }
                />

                {/* EDIT */}
                <Route
                    path="/members/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditMemberPage />
                        </ProtectedRoute>
                    }
                />

                {/* fallback */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Layout>
    );
}

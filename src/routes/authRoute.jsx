import { lazy, Suspense } from "react";

const LoadingPage = lazy(() => import("../components/LoadingPage"));
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("../features/auth/pages/RegisterPage"));


const authRoute = [
    {
        path: '/login',
        element: <Suspense fallback={<LoadingPage />}><LoginPage /></Suspense>,
    },
    {
        path: '/register',
        element: <Suspense fallback={<LoadingPage />}><RegisterPage /></Suspense>,
    },
]

export default authRoute
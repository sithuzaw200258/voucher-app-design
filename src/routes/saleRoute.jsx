import { lazy } from "react";

const SalePage = lazy(() => import("../features/sale/pages/SalePage"));

const saleRoute = [
    {
        path: 'sales',
        element: <SalePage />
    },
]

export default saleRoute
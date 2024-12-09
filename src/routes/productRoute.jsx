import { lazy } from 'react';

const ProductCreatePage = lazy(() => import("../features/product/pages/ProductCreatePage"));
const ProductEditPage = lazy(() => import("../features/product/pages/ProductEditPage"));
const ProductListPage = lazy(() => import("../features/product/pages/ProductListPage"));

const productRoute = [
    {
        path: 'products',
        element: <ProductListPage />
    },
    {
        path: 'products/create',
        element: <ProductCreatePage />
    },
    {
        path: 'products/edit/:id',
        element: <ProductEditPage />
    }
]

export default productRoute
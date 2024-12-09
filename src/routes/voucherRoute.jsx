import { lazy } from 'react';

const VoucherListPage = lazy(() => import('../features/voucher/pages/VoucherListPage'));
const VoucherDetailPage = lazy(() => import('../features/voucher/pages/VoucherDetailPage'));

const voucherRoute = [
    {
        path: 'vouchers',
        element: <VoucherListPage />
    },
    {
        path: 'vouchers/detail/:id',
        element: <VoucherDetailPage />
    },
    
]

export default voucherRoute
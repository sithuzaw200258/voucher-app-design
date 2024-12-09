import React from 'react'
import Breadcrumb from '../../../components/Breadcrumb'
import Container from '../../../components/Container'
import VoucherInfo from '../components/VoucherInfo'

const VoucherDetailPage = () => {
    return (
        <section>
            <Container>
                <Breadcrumb currentPageName={'Voucher Details'} links={[{ name: 'Vouchers', path: '/dashboard/vouchers' }]} />
                <VoucherInfo />
            </Container>
        </section>
    )
}

export default VoucherDetailPage
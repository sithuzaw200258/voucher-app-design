import React from 'react'
import Container from '../../../components/Container'
import Breadcrumb from '../../../components/Breadcrumb'
import VoucherTable from '../components/VoucherTable'

const VoucherListPage = () => {
    
    return (
        <section>
            <Container>
                <div>
                    {/* Breadcrumb */}
                    <Breadcrumb currentPageName={'Vouchers'} />

                    {/* Voucher  Table*/}
                    <VoucherTable />
                </div>
            </Container>
        </section>
    )
}

export default VoucherListPage
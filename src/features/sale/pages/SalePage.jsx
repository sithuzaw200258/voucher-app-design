import React from 'react'
import Container from '../../../components/Container'
import Breadcrumb from '../../../components/Breadcrumb'
import SaleCard from '../components/SaleCard'

const SalePage = () => {
    return (
        <section>
            <Container>
                <div>
                    {/* Breadcrumb */}
                    <Breadcrumb currentPageName={'Sales'} />

                    {/* Sale Card */}
                    <SaleCard />

                </div>
            </Container>
        </section>
    )
}

export default SalePage
import React from 'react'
import Container from '../../../components/Container'
import Breadcrumb from '../../../components/Breadcrumb'
import ProductTable from '../components/ProductTable'

const ProductListPage = () => {
    
    return (
        <section>
            <Container>
                <div>
                    {/* Breadcrumb */}
                    <Breadcrumb currentPageName={'Products'} />

                    {/* Product  Table*/}
                    <ProductTable />
                </div>
            </Container>
        </section>
    )
}

export default ProductListPage
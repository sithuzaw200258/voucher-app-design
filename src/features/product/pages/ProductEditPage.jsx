import React from 'react'
import Container from '../../../components/Container'
import Breadcrumb from '../../../components/Breadcrumb'
import ProductEditForm from '../components/ProductEditForm'
const ProductEditPage = () => {
    return (
        <section>
            <Container>
                <Breadcrumb currentPageName={'Edit Product'} links={[{ name: 'Products', path: '/dashboard/products' }]} />
                <ProductEditForm />
            </Container>
        </section>
    )
}

export default ProductEditPage
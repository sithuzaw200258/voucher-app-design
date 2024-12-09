import React from 'react'
import Container from '../../../components/Container'
import Breadcrumb from '../../../components/Breadcrumb'
import ProductCreateForm from '../components/ProductCreateForm'

const ProductCreatePage = () => {
    return (
        <section>
            <Container>
                <Breadcrumb currentPageName={'Create Product'} links={[{ name: 'Products', path: '/dashboard/products' }]} />
                <ProductCreateForm />
            </Container>
        </section>
    )
}

export default ProductCreatePage
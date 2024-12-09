import React from 'react'
import { Link } from 'react-router-dom'

const ProductEmptyState = () => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
            <td scope="row" colSpan={6} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                There is no product. <Link to="/dashboard/products/create" className="text-blue-600 hover:underline dark:text-blue-500">Create Product</Link>
            </td>
        </tr>
    )
}

export default ProductEmptyState
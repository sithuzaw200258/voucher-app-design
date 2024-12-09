import React from 'react'

const VoucherEmptyState = () => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
            <td scope="row" colSpan={7} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                There is no product. 
            </td>
        </tr>
    )
}

export default VoucherEmptyState
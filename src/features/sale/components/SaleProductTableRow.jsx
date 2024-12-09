import React, { useRef } from 'react'
import toast from 'react-hot-toast';
import { BiTrash } from 'react-icons/bi'
import { LuMinus, LuPlus } from 'react-icons/lu';
import useSaleProductStore from '../../../stores/useSaleProductStore';

const SaleProductTableRow = ({ record: { product_id, quantity, cost, product: { product_name, price } }, index }) => {
    // console.log(record)
    const { removeRecord, changeQuantity } = useSaleProductStore();
    const handleDeleteBtn = () => {
        // console.log(id)
        removeRecord(product_id)
        toast.success('Record is deleted successfully', {
            position: 'top-right',
        })

    }

    const handleDecreaseQuantity = () => {
        if (!(quantity <= 1)) {
            changeQuantity(product_id, -1)
        }
    }

    const handleIncreaseQuantity = () => {
        changeQuantity(product_id, 1)
    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product_name}
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {price}
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {/* Decrease Button */}
                <button onClick={handleDecreaseQuantity} className="bg-red-500 hover:bg-red-600 font-bold py-[7px] px-2 rounded">
                    <LuMinus className='text-white' />
                </button>
                <span className="mx-4">{quantity}</span>

                {/* Increase Button */}
                <button onClick={handleIncreaseQuantity} className="bg-green-500 hover:bg-green-600 font-bold py-[7px] px-2 rounded">
                    <LuPlus className='text-white' />
                </button>
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-end">
                {cost}
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-end">
                <button onClick={handleDeleteBtn}><BiTrash className='text-red-500 size-5' /></button>
            </th>
        </tr>
    )
}

export default SaleProductTableRow
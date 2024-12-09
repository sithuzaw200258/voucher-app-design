import React from 'react'
import { BiSolidEdit, BiTrash } from 'react-icons/bi'
import { useSWRConfig } from 'swr';
import { bouncy } from 'ldrs'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import reactUseCookie from 'react-use-cookie';
import ShowDateTime from '../../../components/ShowDateTime';
import { deleteProduct } from '../../../services/product';

bouncy.register()
const ProductRow = ({ product: { id, product_name, price, created_at,updated_at } }) => {

    const [token,setToken] = reactUseCookie('my_token');

    const productUrl = import.meta.env.VITE_API_URL + '/products';

    const { mutate } = useSWRConfig();
    // const handleDeleteBtn = async () => {
    //     // setIsDeleting(true);
    //     const res = await deleteProduct(id);
    //     const json = await res.json();
    //     if (res.status === 200) {
    //         mutate(productUrl);
    //         toast.success(json.message)
    //     }else{
    //         toast.error(json.message)
    //     }
    // }

    const handleDeleteBtn = async () => {
        try {
            const res = await deleteProduct(id);
            const json = await res.json();
    
            if (res.status === 200) {
                mutate(productUrl);
                toast.success(json.message || 'Product deleted successfully');
            } else {
                throw new Error(json.message || 'Failed to delete product');
            }
        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred');
        }
    };
    

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {id}
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {product_name}
            </th>
            <td className="px-6 py-4">
                {price}
            </td>
            <td className="px-6 py-4 text-end text-nowrap">
                <ShowDateTime timestamp={created_at} />
            </td>
            <td className="px-6 py-4 text-end text-nowrap">
                <ShowDateTime timestamp={updated_at} />
            </td>
            <td className="px-6 py-4">
                <div className='text-end'>
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        <Link to={'/dashboard/products/edit/' + id} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                            <BiSolidEdit className='text-yellow-500' />
                        </Link>
                        <button onClick={handleDeleteBtn} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                            {/* {isDeleting ? <l-bouncy
                                size="45"
                                speed="1.75"
                                color="black"
                            ></l-bouncy> : <BiTrash className='text-red-500' />} */}
                            <BiTrash className='text-red-500' />

                        </button>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default ProductRow
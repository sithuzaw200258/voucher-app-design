import React from 'react'
import { BiInfoCircle, BiTrash } from 'react-icons/bi'
import { useSWRConfig } from 'swr';
import { bouncy } from 'ldrs'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ShowDateTime from '../../../components/ShowDateTime';
import Avatar from 'react-avatar';
import { LuCalendar } from 'react-icons/lu';
import { deleteVoucher } from '../../../services/voucher';

bouncy.register()
const VoucherRow = ({ voucher: { id, voucher_id, customer_name, customer_email, tax, total, sale_date, created_at, updated_at } }) => {

    const voucherUrl = import.meta.env.VITE_API_URL + '/vouchers';

    const { mutate } = useSWRConfig();

    const handleDeleteBtn = async () => {
        try {
            const res = await deleteVoucher(id);
            const json = await res.json();

            if (res.status === 200) {
                mutate(voucherUrl);
                toast.success(json.message || 'Voucher deleted successfully');
            } else {
                throw new Error(json.message || 'Failed to delete voucher');
            }
        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred');
        }
    };


    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <p>{voucher_id}</p>
                <p className='text-xs text-stone-500 flex gap-1 items-center'>
                    <LuCalendar />
                    {sale_date}
                </p>
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                <div className='flex gap-2 items-center'>
                    <Avatar name={customer_name} size="40" round textSizeRatio={2} />
                    <div>
                        <p>{customer_name}</p>
                        <p className="text-xs text-stone-500">{customer_email}</p>
                    </div>
                </div>
            </th>
            <td className="px-6 py-4">
                {tax}
            </td>
            <td className="px-6 py-4">
                {total}
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
                        <Link to={'/dashboard/vouchers/detail/' + id} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                            <BiInfoCircle className='text-yellow-500' />
                        </Link>
                        <button onClick={handleDeleteBtn} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                            <BiTrash className='text-red-500' />
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default VoucherRow
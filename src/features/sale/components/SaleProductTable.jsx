import React from 'react'
import SaleProductTableRow from './SaleProductTableRow';
import useSaleProductStore from '../../../stores/useSaleProductStore';

const SaleProductTable = () => {
    const { records } = useSaleProductStore();
    const total = records.reduce((pv, record) => pv + record.cost, 0);
    const tax = total * 0.07;
    const net_total = total + tax;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Qiantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-end">
                            Cost
                        </th>
                        <th scope="col" className="px-6 py-3 text-end">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {/* No Products */} \
                    {records.length == 0 && (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                            <td scope="row" colSpan={6} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                There is no records.
                            </td>
                        </tr>
                    )}

                    {records.map((record, index) => (
                        <SaleProductTableRow index={index} record={record} key={record.product_id} />
                    ))}

                </tbody>

                <tfoot>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                        <td scope="row" colSpan={4} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-end">
                            Total
                        </td>
                        <td className='text-end px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'> {total.toFixed(2)} </td>

                        <td className='text-end px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>  </td>
                    </tr>

                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                        <td scope="row" colSpan={4} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-end">
                            Tax (7%)
                        </td>
                        <td className='text-end px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'> {tax.toFixed(2)} </td>

                        <td className='text-end px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>  </td>
                    </tr>

                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                        <td scope="row" colSpan={4} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-end">
                            Net Total (THB)
                        </td>
                        <td className='text-end px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'> {net_total.toFixed(2)} </td>

                        <td className='text-end px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>  </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default SaleProductTable
import React from 'react'
import { useSearchParams } from 'react-router-dom';

const ProductSkeletonLoader = () => {

    const [params, setParams] = useSearchParams();
    const currentLimit = params.get("limit") ?? 5;
    // console.log(currentLimit);
    const count = Number(currentLimit);
    return (
        <>
            {[...Array(count)].map((_, i) => (
                <tr key={i} className="bg-gray-100 animate-pulse border-b dark:bg-gray-700 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap">
                        <div className="w-6 h-6 bg-gray-300 rounded dark:bg-gray-600"></div>
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap">
                        <div className="h-4 bg-gray-300 rounded dark:bg-gray-600 w-48"></div>
                    </th>
                    <td className="px-6 py-4">
                        <div className="h-4 bg-gray-300 rounded dark:bg-gray-600 w-20"></div>
                    </td>
                    <td className="px-6 py-4 text-end">
                        <div className="h-4 bg-gray-300 rounded dark:bg-gray-600 w-full"></div>
                    </td>
                    <td className="px-6 py-4 text-end">
                        <div className="h-4 bg-gray-300 rounded dark:bg-gray-600 w-full"></div>
                    </td>  
                    <td className="px-6 py-4 text-end">
                        <div className="inline-flex rounded-md shadow-sm">
                            <button type="button" className="px-4 py-2 bg-gray-300 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:border-gray-700" disabled></button>
                            <button type="button" className="px-4 py-2 bg-gray-300 border border-gray-300 rounded-e-lg dark:bg-gray-600 dark:border-gray-700" disabled></button>
                        </div>
                    </td>
                </tr>
            ))}
        </>





    )
}

export default ProductSkeletonLoader
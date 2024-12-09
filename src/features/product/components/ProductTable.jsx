import React, { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import ProductSkeletonLoader from './ProductSkeletonLoader'
import ProductRow from './ProductRow'
import ProductEmptyState from './ProductEmptyState'
import { IoSearchOutline } from 'react-icons/io5'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash'
import Pagination from '../../../components/Pagination'
// import useTokenStore from '../stores/useTokenStore'
import reactUseCookie from 'react-use-cookie'
import { LuCirclePlus } from 'react-icons/lu'
import { fetchProducts } from '../../../services/product'
import { urlToParamObject } from '../../../utils/url'
import Sortable from '../../../components/Sortable'



const ProductTable = () => {
    const location = useLocation();
    // console.log(location.search)

    // Add Search Param in URL Bar
    const [params, setParams] = useSearchParams();
    // const { token } = useTokenStore();

    // console.log(import.meta.env.VITE_API_URL)
    // const [search, setSearch] = useState('');

    const searchRef = useRef();

    useEffect(() => {
        searchRef.current.value = params.get('q') || '';
    }, [params]);

    const [token, setToken] = reactUseCookie('my_token');

    const baseUrl = import.meta.env.VITE_API_URL;
    // const productUrl = baseUrl + '/products';
    const productUrl = baseUrl + '/products' + location.search;
    const [fetchUrl, setFetchUrl] = useState(productUrl);

    // const fetcher = (url) => fetch(url,{
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Accept': 'application/json'
    //     }
    // }).then((res) => res.json());
    const { data, error, isLoading } = useSWR(fetchUrl, fetchProducts);

    const handleSearch = debounce((e) => {
        // setSearch(e.target.value)
        // console.log(e.target.value)
        if (e.target.value) {
            setParams({ q: e.target.value })
            setFetchUrl(`${baseUrl + '/products'}?q=${e.target.value}`)
        } else {
            setParams({})
            setFetchUrl(`${baseUrl + '/products'}`)
        }
    }, 500)

    const updateFetchUrl = (url) => {

        // const currentUrl = new URL(url);
        // const newSearchParams = new URLSearchParams(currentUrl.search);
        // const paramObject = Object.fromEntries(newSearchParams);

        setParams(urlToParamObject(url))
        setFetchUrl(url)
    }

    const handleSort = (sortData) => {
        // console.log(sortData);
        const sortParams = new URLSearchParams(sortData).toString();
        setParams(sortData);
        setFetchUrl(`${productUrl}?${sortParams}`);
    };

    // if(isLoading) {
    //     return <ProductSkeletonLoader />
    // }

    // console.log(data)

    return (
        <>
            {/* Search and Create Button */}
            <div className="mt-5">
                <div className="flex justify-between items-center">
                    <div className="">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <IoSearchOutline className='text-gray-500 dark:text-gray-400' />
                            </div>
                            <input onChange={handleSearch} type="search" id="default-search" ref={searchRef} className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search products" required />

                        </div>
                    </div>
                    <div className="">
                        <Link to="/dashboard/products/create" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Create new product
                            <LuCirclePlus className='ms-2 text-xl' />
                        </Link>

                    </div>
                </div>
            </div>

            {/* Product Table */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                {/* <div className="flex items-center gap-1">
                                    <span className="pr-3">#</span>
                                    <span className=" flex flex-col">
                                        <button
                                            className=" hover:bg-stone-300"
                                            onClick={handleSort.bind(null, {
                                                sort_by: "id",
                                                sort_direction: "asc",
                                            })}
                                        >
                                            <HiChevronUp />
                                        </button>
                                        <button
                                            className=" hover:bg-stone-300"
                                            onClick={handleSort.bind(null, {
                                                sort_by: "id",
                                                sort_direction: "desc",
                                            })}
                                        >
                                            <HiChevronDown />
                                        </button>
                                    </span>
                                </div> */}
                                <Sortable sortBy="id" handleSort={handleSort}>#</Sortable>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <Sortable sortBy="product_name" handleSort={handleSort}> Product name</Sortable>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <Sortable sortBy="price" handleSort={handleSort}>Price</Sortable>
                            </th>
                            <th scope="col" className="px-6 py-3 text-end">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3 text-end">
                                Updated At
                            </th>
                            <th scope="col" className="px-6 py-3 text-end">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {isLoading ? (
                            // Skeleton Loading
                            <ProductSkeletonLoader />
                        ) : data?.data?.length === 0 ? (
                            <ProductEmptyState />
                        ) : data?.data?.map((product) => (
                            <ProductRow key={product.id} product={product} />
                        ))
                        }

                    </tbody>
                </table>
            </div>

            {<Pagination links={data?.links} meta={data?.meta} updateFetchUrl={updateFetchUrl} />}
        </>
    )
}

export default ProductTable
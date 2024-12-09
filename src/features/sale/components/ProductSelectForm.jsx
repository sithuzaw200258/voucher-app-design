import React from 'react'
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import useSaleProductStore from '../../../stores/useSaleProductStore';
import { fetchProducts } from '../../../services/product';

const ProductSelectForm = () => {
    const { register, handleSubmit, setError,
        formState: { errors }, reset } = useForm();

    const { addRecord, changeQuantity, records } = useSaleProductStore();

    const onSubmit = (data) => {
        const product = JSON.parse(data.product);
        const productId = product.id;

        // const isExist = records.find((record) => record.product.id === productId);
        const isExist = records.find(({ product: { id } }) => id === productId);
        // console.log(isExist);
        if (isExist) {
            changeQuantity(isExist.product_id, data.quantity);
        } else {
            addRecord({
                // id: Date.now(),
                product_id: productId,
                product: product,
                quantity: data.quantity,
                cost: product.price * data.quantity,
                created_at: new Date().toISOString(),
            });
        }

        reset();
    }

    const baseUrl = import.meta.env.VITE_API_URL;
    const productUrl = baseUrl + '/products?limit=100';

    // const fetcher = (url) => fetch(url, {
    //     headers: {
    //         'Accept': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     }
    // }).then((res) => res.json());
    const { data, error, isLoading } = useSWR(productUrl, fetchProducts);


    return (
        <div className='border rounded p-5 bg-slate-100'>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-5 ">
                    <div className="col-span-2">
                        <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your product</label>
                        <select {...register('product', { required: "Product is required" })} id="product" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {/* <option value="US">United States</option> */}
                            <option value="">Select product</option>
                            {!isLoading &&
                                data?.data?.map((product) => (
                                    <option value={JSON.stringify(product)} key={product.id}> {product.product_name}</option>
                                ))}

                        </select>
                        {errors.product && <p className='text-red-600 text-sm'>{errors.product.message}</p>}
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="quantity" className={` block mb-2 text-sm font-medium  dark:text-white ${errors.quantity ? "text-red-600" : "text-gray-900"}`}>Product Quantity</label>
                        <input {...register('quantity', {
                            required: "Product Quantity is required", // Error message
                        })} defaultValue={1} type="text" id="quantity" className={`bg-gray-50 border ${errors.quantity ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                        {errors.quantity && <p className='text-red-600 text-sm'>{errors.quantity.message}</p>}
                    </div>

                    <div className="col-span-1 flex flex-col justify-end items-end">
                        <button type="submit" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-9 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Add Product</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProductSelectForm
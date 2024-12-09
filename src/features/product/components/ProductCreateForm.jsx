import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ring2 } from 'ldrs'
import toast from 'react-hot-toast'
import reactUseCookie from 'react-use-cookie'
import { createProduct } from '../../../services/product'
import Spinner from '../../../components/Spinner'

ring2.register()

const ProductCreateForm = () => {
    const [token, setToken] = reactUseCookie('my_token');
    const { register, handleSubmit, setError,
        formState: { errors, isSubmitting }, reset } = useForm();

    // const [isSending, setIsSending] = useState(false);
    const navigate = useNavigate();

    // const baseUrl = import.meta.env.VITE_API_URL;
    // const productUrl = baseUrl + '/products';
    // const handleCreateProduct = async (data) => {
    //     // console.log(data)
    //     setIsSending(true)
    //     const productName = data.product_name;
    //     // data.created_at = new Date().toISOString();
    //     const res = await createProduct(data.product_name, data.price);
    //     const json = await res.json();

    //     if (res.status !== 201) {
    //         toast.error(json.message);
    //         return;
    //     }
    //     setIsSending(false)
    //     reset()

    //     if (data.back_to_product_list) {
    //         navigate('/dashboard/products');
    //     }
    //     toast.success(`${productName} is created successfully`)
    // }

    const handleCreateProduct = async (data) => {
        console.log(data)
        try {
            // setIsSending(true);

            const { product_name, price, back_to_product_list } = data;

            // Send the request to create the product
            const res = await createProduct(product_name, price);
            const json = await res.json();

            if (res.status !== 201) {
                throw new Error(json.message || 'Failed to create product');
            }

            // Reset form and navigate if applicable
            reset();
            if (back_to_product_list) {
                navigate('/dashboard/products');
            }

            toast.success(`${product_name} has been created successfully`);
        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred');
        }
        // finally {
        //     setIsSending(false);
        // }
    };


    return (
        <div className='mt-5'>
            <h1 className='text-base rounded font-bold text-white bg-blue-600 w-1/2 py-2 px-3'>Create New Product</h1>

            <div className="mt-5">
                <form className="w-1/2" onSubmit={handleSubmit(handleCreateProduct)}>
                    <div className="mb-5">
                        <label htmlFor="product_name" className={` block mb-2 text-sm font-medium  dark:text-white ${errors.product_name ? "text-red-600" : "text-gray-900"}`}>Product Name</label>
                        <input {...register('product_name', {
                            required: "Product Name is required", // Error message
                            minLength: {
                                value: 3,
                                message: "Product Name must be at least 3 characters long", // Error message
                            },
                        })} type="text" id="product_name" className={`bg-gray-50 border ${errors.product_name ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="eg. Apple Watch" />
                        {errors.product_name && <p className='text-red-600 text-sm'>{errors.product_name.message}</p>}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price</label>
                        <input {...register('price', {
                            required: "Product Price is required", // Error message
                            minLength: {
                                value: 1,
                                message: "Product Price must be at least one character", // Error message
                            }
                        })} type="text" id="price" placeholder='eg. 100' className={`bg-gray-50 border ${errors.price ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                        {errors.price && <p className='text-red-600 text-sm'>{errors.price.message}</p>}
                    </div>
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input {...register('back_to_product_list')} id="remember" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Go back to product list</label>
                    </div>

                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input {...register('checked')} required id="remember" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Check your product</label>
                    </div>

                    <div className='text-end'>
                        <Link to="/dashboard/products" className="bg-stone-100 me-2 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Cancel</Link>

                        <button type="submit" disabled={isSubmitting} className="inline-flex justify-center items-center gap-3 disabled:opacity-50 disabled:pointer-events-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <span>Create Product</span>
                            {isSubmitting && <Spinner />}
                            {/* {isSending &&
                                <l-ring-2
                                    size="20"
                                    stroke="2"
                                    stroke-length="0.25"
                                    bg-opacity="0.1"
                                    speed="0.8"
                                    color="white"
                                ></l-ring-2>
                            } */}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductCreateForm
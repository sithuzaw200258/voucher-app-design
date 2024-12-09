import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import reactUseCookie from 'react-use-cookie';
import useSaleProductStore from '../../../stores/useSaleProductStore';
import toast from 'react-hot-toast';
import { createVoucher } from '../../../services/voucher';
import ProductSelectForm from './ProductSelectForm';
import SaleProductTable from './SaleProductTable';

const SaleCard = () => { 
    const [token, setToken] = reactUseCookie('my_token');
    const navigate = useNavigate();
    const [isSending, setIsSending] = useState(false);

    const { register, handleSubmit, setError,
        formState: { errors }, reset } = useForm();

    const { records, resetRecords } = useSaleProductStore();
    const total = records.reduce((pv, record) => pv + record.cost, 0);
    const tax = total * 0.07;
    const net_total = total + tax;

    const baseUrl = import.meta.env.VITE_API_URL;
    // const handleCreateVoucher = async (data) => {
    //     // console.log({ ...data, records, total, tax, netTotal });
    //     const currentVoucher = { ...data, records, total, tax, net_total };
    //     // console.log(currentVoucher)
    //     const res = await createVoucher(currentVoucher);
    //     console.log(res)
    //     const json = await res.json();
    //     console.log(json)

    //     if (res.status === 201) {
    //         resetRecords();
    //         reset();
    //         toast.success('Voucher is created successfully', {
    //             position: 'top-right',
    //         })

    //         if (data.redirect_to_detail) {
    //             navigate(`/dashboard/vouchers/detail/${json.voucher.id}`)
    //         }
    //     } else {
    //         toast.error(json.message, {
    //             position: 'top-right',
    //         })
    //     }
    // }

    const handleCreateVoucher = async (data) => {
        try {
            // Prepare the voucher data
            const currentVoucher = { 
                ...data, 
                records, 
                total, 
                tax, 
                net_total 
            };
    
            // Send a request to create a voucher
            const res = await createVoucher(currentVoucher);
            const json = await res.json();

            console.log(json);
    
            if (res.status === 201) {
                // Handle successful creation
                resetRecords();
                reset();
                toast.success('Voucher is created successfully');
    
                // Navigate to the voucher detail page if applicable
                if (data.redirect_to_detail) {
                    navigate(`/dashboard/vouchers/detail/${json?.data?.id}`);
                }
            } else {
                // Handle error response
                toast.error(json.message);
            }
        } catch (error) {
            // Log and handle unexpected errors
            console.error('Error creating voucher:', error);
            toast.error('An unexpected error occurred. Please try again.');
        }
    };
    

    const generateInvoiceNumber = () => {
        // Prefix for the invoice number
        const prefix = "INV";

        // Get the current date in YYYYMMDD format
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, add 1
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${year}${month}${day}`;

        // Generate a random 4-digit number for uniqueness
        const randomNum = Math.floor(1000 + Math.random() * 9000); // Generates a number between 1000 and 9999

        // Combine the prefix, formatted date, and random number
        return `${prefix}-${formattedDate}-${randomNum}`;
    };

    // console.log(generateInvoiceNumber());
    return (
        <div className='mt-5'>
            <form id='infoForm' action="" onSubmit={handleSubmit(handleCreateVoucher)}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    <div className="col-span-1">
                        <div className="mb-5">
                            <label htmlFor="voucher_id" className={` block mb-2 text-sm font-medium  dark:text-white ${errors.voucher_id ? "text-red-600" : "text-gray-900"}`}>Voucher ID</label>
                            <input {...register('voucher_id', {
                                required: "Voucher ID is required", // Error message
                            })} defaultValue={generateInvoiceNumber()} type="text" id="voucher_id" className={`bg-gray-50 border ${errors.voucher_id ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="eg. VI237238343" />
                            {errors.voucher_id && <p className='text-red-600 text-sm'>{errors.voucher_id.message}</p>}
                        </div>
                    </div>

                    <div className="col-span-1">
                        <div className="mb-5">
                            <label htmlFor="customer_name" className={` block mb-2 text-sm font-medium  dark:text-white ${errors.customer_name ? "text-red-600" : "text-gray-900"}`}>Customer Name</label>
                            <input {...register('customer_name', {
                                required: "Customer Name is required", // Error message
                            })} type="text" id="customer_name" className={`bg-gray-50 border ${errors.customer_name ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="eg. John Doe" />
                            {errors.customer_name && <p className='text-red-600 text-sm'>{errors.customer_name.message}</p>}
                        </div>
                    </div>

                    <div className="col-span-1">
                        <div className="mb-5">
                            <label htmlFor="customer_email" className={` block mb-2 text-sm font-medium  dark:text-white ${errors.customer_email ? "text-red-600" : "text-gray-900"}`}>Customer Email</label>
                            <input {...register('customer_email', {
                                required: "Customer Email is required", // Error message
                            })} type="text" id="customer_email" className={`bg-gray-50 border ${errors.customer_email ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="eg. johndoe@gmail.com" />
                            {errors.customer_email && <p className='text-red-600 text-sm'>{errors.customer_email.message}</p>}
                        </div>
                    </div>

                    <div className="col-span-1">
                        <div className="mb-5">
                            <label htmlFor="sale_date" className={` block mb-2 text-sm font-medium  dark:text-white ${errors.sale_date ? "text-red-600" : "text-gray-900"}`}>Sale Date</label>
                            <input {...register('sale_date', {
                                required: "Sale Date is required", // Error message
                            })} defaultValue={new Date().toISOString().slice(0, 10)} type="date" id="sale_date" className={`bg-gray-50 border ${errors.sale_date ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="eg. 2022-01-01" />
                            {errors.sale_date && <p className='text-red-600 text-sm'>{errors.sale_date.message}</p>}
                        </div>
                    </div>
                </div>
            </form>

            {/* <ProductSelectForm /> */}
            <ProductSelectForm />

            {/* <SaleProductTable /> */}
            <SaleProductTable />

            <div className="flex flex-col items-end">
                <div className="flex items-center justify-start mt-3">
                    <label htmlFor="remember" className="me-2 text-sm font-medium text-gray-900 dark:text-gray-300">Redirect to Voucher Detail Page</label>
                    <div className="flex items-center h-5">
                        <input {...register('redirect_to_detail')} form='infoForm' id="remember" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                    </div>
                </div>

                <div className="flex items-center justify-start mt-3">
                    <label htmlFor="remember" className="me-2 text-sm font-medium text-gray-900 dark:text-gray-300">Check all your data</label>
                    <div className="flex items-center h-5">
                        <input {...register('checked')} form='infoForm' required id="remember" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                    </div>
                </div>
            </div>

            <div className='text-end mt-5'>

                <button form='infoForm' type="submit" className="inline-flex justify-center items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Confirm Voucher
                    {isSending &&
                        <l-ring-2
                            size="20"
                            stroke="2"
                            stroke-length="0.25"
                            bg-opacity="0.1"
                            speed="0.8"
                            color="white"
                        ></l-ring-2>
                    }
                </button>
            </div>
        </div>
    )
}

export default SaleCard
import React from 'react'

const HomeCard = ({ product }) => {
    return (
        <div className='cursor-pointer flex flex-col items-center bg-white justify-center mx-auto  overflow-hidden w-[14rem] mx-3 shadow-md rounded-lg'>
            <div className='h-[15rem] w-[14rem]'>
                <img className='object-cover object-top w-full h-full' src={product.imageUrl} />
            </div>

            <div className='p-4'>
                <h3 className='text-lg font-medium text-gray-900'>{product.brand}</h3>
                <p className='mt-2 text-md text-gray-500'>{product.title}</p>
            </div>
        </div>
    )
}

export default HomeCard
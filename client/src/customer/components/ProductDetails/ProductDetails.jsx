import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import Rating from "@mui/material/Rating";
import { Box, Button, Grid2, Grid } from "@mui/material";
import ProductreviewCard from "./ProductreviewCard";
import LinearProgress from "@mui/material/LinearProgress";
import { mens_kurta } from "../../../Data/Men/men_kurta";
import HomeCard from "../HomeSectionCard/HomeCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findProductsById } from "../../../Redux/Product/Action";
import { useSelector } from "react-redux";
import { addItemToCart } from "../../../Redux/Cart/Actions";
import { getCart } from "../../../Redux/Cart/Actions";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    const { product } = useSelector(store => store)
    const [selectedSize, setSelectedSize] = useState("")
    const { auth } = useSelector(store => store)
    const { cart } = useSelector(store => store)
    console.log(product, "product")
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddtoCart = () => {
        const data = { productId: params?.productId, size: selectedSize }
        dispatch(addItemToCart(data))
        dispatch(getCart());
        navigate("/cart");
    };


    useEffect(() => {
        const data = { productId: params?.productId }
        dispatch(findProductsById(data))

    }, [params?.productId])

    return (
        <div className="bg-white lg:px-20">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">


                        <li className="text-sm">
                            <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product.name}
                            </a>
                        </li>
                    </ol>
                </nav>
                <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                            <img

                                src={product.product?.imageUrl}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="flex flex-wrap space-x-5 justify-center">

                        </div>

                    </div>
                    <div className="lg:col-span-1 max-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
                        <div className="lg:col-span-2 ">
                            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{product.product?.title}</h1>
                            <h1 className='text-lg lg:text-xl text-gray-900 opacity-60 pt-1'>
                                {product.product?.brand}
                            </h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <div className='flex items-center text-lg space-x-5 lg:text-xl text-gray-900 mt-6'>
                                <p className='font-semibold '>
                                    ₹{product?.product?.discountedPrice}
                                </p>
                                <p className='opacity-50 line-through'>
                                    ₹{product.product?.price}

                                </p>
                                <p className='text-green-600 font-semibold'>
                                    {product?.product?.discountedPercent}% off
                                </p>

                            </div>

                            {/* Reviews */}
                            <div className="mt-6">
                                <div className='flex items-center space-x-3'>
                                    <Rating name="read-only" value={4.5} readOnly />
                                    <p className='opacity-50 text-sm'>32242 Ratings</p>
                                    <p className="ml-3 text-sm font-medium text-[#38a3a5] hover:text-[#56c2c4]">334 Reviews </p>

                                </div>
                            </div>

                            <form className="mt-10">


                                {/* Sizes - Show only if the product belongs to clothing */}
                                {(product.product?.category?.parentCategory === "66eaaf602c60f75d1081cc1d") && (
                                    <div className="mt-10">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                        </div>

                                        <fieldset aria-label="Choose a size" className="mt-4">
                                            <RadioGroup
                                                value={selectedSize}
                                                onChange={setSelectedSize}
                                                className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                                            >
                                                {product.product?.sizes?.map((size) => (
                                                    <Radio
                                                        key={size.name}
                                                        value={size.name}
                                                        disabled={size.quantity === 0} // Disable if quantity is 0
                                                        className={classNames(
                                                            size.quantity > 0
                                                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                            'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6',
                                                        )}
                                                    >
                                                        <span>{size.name}</span>
                                                        {size.quantity > 0 ? (
                                                            <span
                                                                aria-hidden="true"
                                                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-[#38a3a5]"
                                                            />
                                                        ) : (
                                                            <span
                                                                aria-hidden="true"
                                                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-400"
                                                            >
                                                                <svg
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 100 100"
                                                                    preserveAspectRatio="none"
                                                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                >
                                                                    <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </Radio>
                                                ))}
                                            </RadioGroup>
                                        </fieldset>
                                    </div>
                                )}

                                <Button
                                    variant="contained"
                                    type='submit'
                                    onClick={handleAddtoCart}
                                    sx={{
                                        p: "2rem",
                                        bgcolor: "#38a3a5",
                                        py: "1rem",
                                        mt: "1rem",
                                        '&:hover': {
                                            bgcolor: "#57b5b6",
                                        },
                                    }}
                                >
                                    Add to Cart
                                </Button>

                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">description{ }</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{product.product?.description}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {/* {product.highlights.map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">{highlight}</span>
                                            </li>
                                        ))} */}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{product.details}</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </section>
                {/* rating and reviews */}


                <section>
                    <h1 className='font-semibold text-lg pb-4 sm:pl-7'>
                        Recent Review & Rating
                    </h1>
                    <div className='border p-8'>
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={8}>
                                <div className='space-y-5'>
                                    {[1, 1, 1, 1].map((item, index) => (
                                        <ProductreviewCard key={index} />
                                    ))}
                                </div>
                            </Grid>

                            <Grid item xs={12} lg={4} >
                                <h1 className='text-xl font-semibold pb-1'>
                                    Product Ratings
                                </h1>
                                <div className='flex items-center space-x-3'>
                                    <Rating name='read-only' value={3.5} precision={0.5} readOnly />
                                    <p className='opacity-60'>45457 Ratings</p>
                                </div>
                                <Box className='mt-5'>

                                    <div className='flex items-center gap-2 mb-2'>
                                        <p className='w-1/4'>Excellent</p>
                                        <div className='w-3/4'>
                                            <LinearProgress
                                                sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                                                variant="determinate"
                                                value={70}
                                                color='success'
                                            />
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-2 mb-2'>
                                        <p className='w-1/4'>Very good</p>
                                        <div className='w-3/4'>
                                            <LinearProgress
                                                sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                                                variant="determinate"
                                                value={60}
                                                color='primary'
                                            />
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-2 mb-2'>
                                        <p className='w-1/4'>Good</p>
                                        <div className='w-3/4'>
                                            <LinearProgress
                                                sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                                                variant="determinate"
                                                value={40}
                                                color='secondary'
                                            />
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-2 mb-2'>
                                        <p className='w-1/4'>Average</p>
                                        <div className='w-3/4'>
                                            <LinearProgress
                                                sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                                                variant="determinate"
                                                value={30}
                                                color='warning'
                                            />
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-2 mb-2'>
                                        <p className='w-1/4'>Poor</p>
                                        <div className='w-3/4'>
                                            <LinearProgress
                                                sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                                                variant="determinate"
                                                value={10}
                                                color='error'
                                            />
                                        </div>
                                    </div>
                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                </section>


                {/* similar products */}
                <section className='pt-10'>
                    <h1 className='py-5 text-xl font-bold'>Similar Products</h1>
                    <div className='flex flex-wrap space-y-5'>
                        {/* {mens_kurta.map((item) => <HomeCard product={item}/>)} */}
                    </div>
                </section>
                <br />
            </div >
        </div >
    )
}

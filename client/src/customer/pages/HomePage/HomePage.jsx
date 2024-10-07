import React from 'react'
import { useEffect } from 'react'
import MainCarosel from '../../components/HomeCarosel/MainCrosel'
import HomeSectionCarosel from '../../components/HomeSectionCarosel/HomeSectionCarosel'
import { mens_kurta } from '../../../Data/Men/men_kurta'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { findProducts } from '../../../Redux/Product/Action'
const HomePage = () => {
    const { product } = useSelector(store => store)
    const dispatch = useDispatch();
    // Ensure product data is available before filtering
    const productList = product?.products?.products || [];
    console.log(product, "product")
    // Filter products based on category
    useEffect(() => {
        const data = {
            category: "",
            colors: [],
            sizes: [],
            maxPrice: 1000000,
            minPrice: 0,
            minDiscount: 0,
            sort: "price_low",
            pageNumber: "",
            pageSize: "",
            stock: ""
        }
        dispatch(findProducts(data))
    }, [product.deletedProduct]) 
    const mensKurta = productList.filter(item => item.category.name === "mens_kurta");
    const mensShirt = productList.filter(item => item.category.name === "shirt");
    console.log(mensShirt, "mensShirt");

    const womensSaree = productList.filter(item => item.category.name === "saree");
    const womensDress = productList.filter(item => item.category.name === "women_dress");

    return (
        <div>
            <MainCarosel />
            <div className='py-20 space-y-10 flex flex-col justify-center px-5 lg:px-10'>
                <HomeSectionCarosel data={mensKurta} sectionName={"Men's Kurta"} />
                <HomeSectionCarosel data={mensShirt} sectionName={"Men's Shirt"} />
                <HomeSectionCarosel data={womensSaree} sectionName={"Women's Saree"} />
                <HomeSectionCarosel data={womensDress} sectionName={"Women's Dress"} />
            </div>
        </div>
    )
}

export default HomePage
import React from 'react'
import Card from "../../../components/(card)/Card"
export default async function RecomndedProducts({ category }) {

    let data = await fetch("https://ecommerce.routemisr.com/api/v1/products?subcategory[in]=" + category)
    data = await data.json()
    return (
        <div className='grid grid-cols-2 gap-5  sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5'>
            {data.data.slice(0, 6).map(product => <Card key={product.__id} product={product} />)}
        </div>
    )
}

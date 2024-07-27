"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaSpinner } from 'react-icons/fa6';

export default function ElectronicesSwiper() {
    const [data, setData] = useState([])
    const [loading, isLodaing] = useState(false)

    const route = useRouter()

    useEffect(() => {
        const getData = async () => {
            isLodaing(true)
            try {
                let response = await fetch(
                    "https://ecommerce.routemisr.com/api/v1/products?category[in]=6439d2d167d9aa4ca970649f"
                )
                response = await response.json()
                setData(response?.data)

            } catch (error) {
                setData([])
            } finally {
                isLodaing(false)

            }
        }
        getData()
    }, [])

    return (
        <div className='container px-10 md:px-16 mx-auto'>
            {
                <>
                    <h2 className='text-3xl font-semibold my-4' >Electronics</h2>

                    {loading ?
                        <div className="flex mx-auto justify-center items-center text-red-600  ">
                            <FaSpinner className='  animate-spin' size={"4rem"} />
                        </div>
                        : <Swiper
                            className="w-full "
                            spaceBetween={5}
                            loop={data.length > 1}
                            breakpoints={{
                                600: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                                1500: {
                                    slidesPerView: 6,
                                },
                            }}
                            centeredSlides={false}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                        >
                            {data.length > 0 && data.map((product) => (
                                <SwiperSlide key={product._id} onClick={() => { route.push(`/products/${product._id}`) }}  >
                                    <div>
                                        <figure className=' w-full  cursor-pointer   '>
                                            <Image
                                                className="  w-full  lg:aspect-square aspect-auto drop-shadow-2xl "
                                                src={product.imageCover}
                                                width={500}
                                                height={500}
                                                loading='lazy'
                                                alt={"image"}
                                            />
                                        </figure>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    }


                </>
            }
        </div>
    )
}

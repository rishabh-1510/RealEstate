
import FrontendLayout from '@/src/components/layouts/FrontendLayout'
import { Navbar } from '@/src/components/navbar/Navbar'
import EmailForm from '@/src/components/properties/EmailForm'
import PropertyPageSkeleton from '@/src/components/skeleton/PropertyPageSkeleton'
import { getProperty } from '@/src/server-actions/getProperty'
import Image from 'next/image'
import React, { Suspense } from 'react'
import { FaMapMarkedAlt, FaRulerCombined } from 'react-icons/fa'
import { LuBath, LuBedDouble } from 'react-icons/lu'

export function formatPrice(price: number | string) {
    return Number(price).toLocaleString();
}

const PropertyPage = async ({ params }: { params: Promise<{ propertyId: string }> }) => {

    const propertyId = (await params).propertyId;
    return (
        <FrontendLayout>
            <Navbar variant='Solid' />
            <Suspense fallback={<PropertyPageSkeleton/>}>
                <PropertyContent propertyId={propertyId} />
            </Suspense>
        </FrontendLayout>
    )
}


export default PropertyPage

async function PropertyContent({ propertyId }: { propertyId: string }) {

    const property = await getProperty(propertyId);
    return (
        <section className='py-15'>
            <div className='mx-auto max-w-7xl px-6 lg:px-12 '>
                <div className='flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between'>
                    {/* left */}
                    <div>
                        <p className='text-sm font-semibold uppercase tracking-[0.25em] text-primary'>
                            {property?.listingType === "sale" ? "FOR SALE" : "FOR RENT"}
                        </p>
                        <h2 className='mt-3 text-4xl font-bold text-text md:text-5xl '>
                            {property?.title}
                        </h2>
                        <div className='flex flex-wrap items-center gap-3 text-sm text-neutral-600 my-6  '>
                            <div className='flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 '>
                                <FaMapMarkedAlt size={16} className='text-neutral-400' />
                                <span className='font-medium text-neutral-800 '>
                                    {property?.location}
                                </span>
                            </div>
                            <div className='flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 '>
                                <FaRulerCombined size={16} className='text-neutral-400' />
                                <span className='font-medium text-neutral-800 '>
                                    {property?.area}
                                </span>
                            </div>
                            <div className='flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 '>
                                <LuBedDouble size={16} className='text-neutral-400' />
                                <span className='font-medium text-neutral-800 '>
                                    {property?.bedrooms}
                                </span>
                            </div>
                            <div className='flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 '>
                                <LuBath size={16} className='text-neutral-400' />
                                <span className='font-medium text-neutral-800 '>
                                    {property?.bathrooms}
                                </span>
                            </div>
                        </div>

                        <div>
                        </div>
                    </div>
                    {/* right */}
                    <div className='rounded-[28px] border border-black/5 bg-card p-6 shadow-sm '>
                        <p className='text-sm text-text/60 '>
                            Property Price
                        </p>
                        <h2 className='mt-2 text-4xl font-bold text-primary'>
                            ${formatPrice(property?.price || "")}
                        </h2>
                    </div>

                </div>

                <div className="w-full h-60 md:h-100 lg:h-120 relative my-6">
                    {property?.image ? (
                        <Image
                            src={property.image}
                            alt={property.title}
                            fill
                            className="rounded-2xl object-cover"
                        />
                    ) : (
                        <div className="w-full h-full rounded-2xl bg-gray-200 flex items-center justify-center">
                            No Image Available
                        </div>
                    )}
                </div>
                <div className='mt-16 grid gap-10 lg:grid-cols-3 '>
                    {/* left */}
                    <div className='lg:col-span-2 '>
                        <div className='border-black/5 bg-card p-8 shadow-sm rounded-4xl'>
                            <h2 className='text-3xl font-bold text-text'>
                                About This Property
                            </h2>
                            <p className='mt-6 leading-relaxed text-text/70 '>
                                {property?.description}
                            </p>
                        </div>
                    </div>
                    {/* Right */}
                    {property?.owner && (
                        <EmailForm propertyPrice={property.price} propertyTitle={property.title} email={property.owner.email} name={property.owner.name} 
                        image={property.owner.image || "/images/avatar.png"} 
                        />
                    )}
                </div>
            </div>
        </section>
    )
}
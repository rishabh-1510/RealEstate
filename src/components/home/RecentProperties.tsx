import { PropertyCard } from "../properties/PropertyCard"
import { getRecentProperties } from "@/src/server-actions/getRecentProperties"
import { Suspense } from "react"
import CardSkeleton from "../skeleton/CardSkeleton"

export const RecentProperties = async () => {

    return (
        <section className='py-24'>
            <div className='mx-auto max-w-7xl px-6 lg:px-12 '>
                {/* header  */}
                <div className='max-w-2xl '>
                    <p className='mb-3 text-sm font-semibold uppercase tracking-[0.25rem] text-primary'>
                        New Listings
                    </p>
                    <h2 className='text-3xl font-bold text-text md:text-4xl '>
                        Discover Recenty Added Properties
                    </h2>
                    <p className='mt-5 text-md leading-relaxed text-text/60'>
                        Browse the latest homes, apartments, villas, and investment opportunities added to
                        our marketplace by trusted property owners and agents.
                    </p>
                </div>

                {/* properties grid */}
                <Suspense fallback={<CardSkeleton/>}>
                    <RecentPropertiesContent />
                </Suspense>
            </div>
        </section>
    )
}

async function RecentPropertiesContent() {
    const RecentProperties = await getRecentProperties();
    return (
        <div className='grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-6 '>
            {RecentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>

    )
}

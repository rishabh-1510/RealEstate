
import FrontendLayout from '@/src/components/layouts/FrontendLayout'
import { Navbar } from '@/src/components/navbar/Navbar'
import { PropertyCard } from '@/src/components/properties/PropertyCard'
import CardSkeleton from '@/src/components/skeleton/CardSkeleton'
import EmptyState from '@/src/components/ui/EmptyState'
import { getUserProperties } from '@/src/server-actions/getUserProperties'
import { Suspense } from 'react'

const PropertiesPage = () => {
    return (
        <FrontendLayout>
            <Navbar variant="Solid" />
            <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
                <div className="flex justify-between ">
                    <h2 className="text-2xl font-bold text-text md:text-3xl">
                        Properties
                    </h2>
                </div>
                <Suspense fallback={<CardSkeleton />}>
                    <PropertiesContent />

                </Suspense>
            </div>
        </FrontendLayout>
    )
}

export default PropertiesPage

async function PropertiesContent() {
    const propeties = await getUserProperties();
    if (propeties.length === 0) {
        return <EmptyState title='No Properties Found' subTitle='You currently have no prooperties available .Check back later aftercreating new listings'></EmptyState> 
    }
    return (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
            {propeties.map((property) => (
                <PropertyCard property={property} key={property.id} />
            ))}
        </div>
    )
}

import FrontendLayout from "../../components/layouts/FrontendLayout"
import { Navbar } from "../../components/navbar/Navbar"
import FilterButton from "../../components/marketPlace/FilterButton"
import MarketPlace from "@/src/components/marketPlace/MarketPlace"
import { Suspense } from "react"
import CardSkeleton from "@/src/components/skeleton/CardSkeleton"

type MarketPlace = {
    searchParams: Promise<{
        search?: string,
        propertyType?: string,
        location?: string,
        address?: string,
        minPrice?: number,
        maxPrice?: number
    }>
}

const MarketPage =async ({searchParams}:MarketPlace) => {
    const params = await searchParams;
    return (
        <FrontendLayout>
            <Navbar variant="Solid" />
            <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
                <div className="flex justify-between ">
                    <h2 className="text-2xl font-bold text-text md:text-3xl">
                        Explore
                    </h2>
                    <FilterButton />
                </div>
                <Suspense fallback={<CardSkeleton/>}>
                    <MarketPlace searchParam={params}/>
                </Suspense>
            </div>
        </FrontendLayout>
    )
}

export default MarketPage   
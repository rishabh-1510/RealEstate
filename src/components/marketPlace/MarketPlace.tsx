import { PropertyCard } from "@/src/components/properties/PropertyCard";
import { getProperties } from "@/src/server-actions/getProperties";
import { Property } from "@/src/types/property";
import EmptyState from "../ui/EmptyState";
import { getFavoriteProperties } from "@/src/server-actions/getFavouriteProperties";

interface MarketPlaceProps {
    searchParam: {
        search?: string,
        propertyType?: string,
        location?: string,
        address?: string,
        minPrice?: number,
        maxPrice?: number
    }
}

export default async function MarketPlace({ searchParam }: MarketPlaceProps) {
    const favoriteProperties = await getFavoriteProperties();
    const properties: Property[] = await getProperties({
        search: searchParam.search,
        address: searchParam.address,
        location: searchParam.location,
        propertyType: searchParam.propertyType,
        minPrice: searchParam.minPrice,
        maxPrice: searchParam.maxPrice
    })
    if (properties.length === 0) {
        return (
            <EmptyState title="No Matching Properties" subTitle="Try adjusting your search criteria or clearing some filters to see more results"
                filter />
        )
    }
    return (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
            {properties.map((property) => (
                <PropertyCard property={property} key={property.id} favoriteProperties={favoriteProperties}/>
            ))}
        </div>
    )
}

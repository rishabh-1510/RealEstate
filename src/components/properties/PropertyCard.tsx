
import { getCurrentUser } from "@/src/server-actions/getCurretnUser"
import { Property } from "@/src/types/property"

import Image from "next/image"
import Link from "next/link"
import FavoriteButton from "../ui/FavoriteButton"
import { getFavoriteProperties } from "@/src/server-actions/getFavouriteProperties"


interface PropertyCardProps {
    property: Property
    favoriteProperties: string[];
}


export const PropertyCard = async ({ property , favoriteProperties}: PropertyCardProps) => {
    
    const isFavorite = favoriteProperties.includes(property.id);
    console.log({
        property: property.id,
        favoriteProperties,
        isFavorite,
    });

    const user = await getCurrentUser();
 
    return (
        <Link href={`/property/${property.id}`} className="group relative h-125 overflow-hidden rounded-4xl">
            <div className="w-full h-full relative">
                <Image src={property.image} alt={property.title} fill className="inset-0 object-cover transition duration-700 group-hover:scale-110" />
                {/* dark overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                {/* top badge */}
                {/* top badge row */}
                <div className="absolute left-5 top-5 z-20 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-primary">
                    {property.listingType === "rent" ? "For Rent" : "For Sale"}
                </div>
                {
                    user && <FavoriteButton propertyId={property.id} user={!!user} isFavorite={isFavorite} />
                }

                {/* content card */}
                <div className="absolute bottom-5 left-5 right-5 z-20 rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
                    {/* price row */}
                    <div className="flex items-center justify-between gap-4">
                        {property.listingType === "rent" ? (
                            <h3 className="text-3xl font-bold text-white flex items-baseline gap-1">
                                ₹{property.price.toLocaleString()}
                                <span className="text-sm text-white/60">/Month</span>
                            </h3>
                        ) : (
                            <h3 className="text-3xl font-bold text-white">
                                ₹{property.price.toLocaleString()}
                            </h3>
                        )}
                        <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white shrink-0">
                            {property.propertyType}
                        </div>
                    </div>
                    {/* location */}
                    <p className="mt-1 text-sm text-white/60">{property.location}</p>
                    {/* title */}
                    <h2 className="mt-3 text-2xl font-bold text-white">
                        {property.title}
                    </h2>
                    {/* features */}
                    <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                        <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                            {property.bedrooms} Bedroom
                        </div>
                        <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                            {property.bathrooms} Bathrooms
                        </div>
                        <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                            {property.area} sqft
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}


import FrontendLayout from "../../components/layouts/FrontendLayout"
import { Navbar } from "../../components/navbar/Navbar"
import { Button } from "../../components/ui/Button"
import { DummyProperties } from "../../constants/DummyProperties"
import { PropertyCard } from "../../components/properties/PropertyCard"
import FilterButton from "../../components/marketPlace/FilterButton"

const MarketPlace = () => {
    return ( 
        <FrontendLayout>
            <Navbar variant="Solid" />
            <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
                <div className="flex justify-between ">
                    <h2 className="text-2xl font-bold text-text md:text-3xl">
                        Explore
                    </h2>
                    <FilterButton/>
                </div>
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
                    {DummyProperties.map((property)=>(
                        <PropertyCard property={property} key={property.id}/>
                    ))}
                </div>
            </div>
        </FrontendLayout>
    )
}

export default MarketPlace
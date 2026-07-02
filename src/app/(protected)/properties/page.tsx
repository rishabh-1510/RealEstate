
import FrontendLayout from '@/src/components/layouts/FrontendLayout'
import { Navbar } from '@/src/components/navbar/Navbar'
import { PropertyCard } from '@/src/components/properties/PropertyCard'
import { DummyProperties } from '@/src/constants/DummyProperties'
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'

const PropertiesPage = () => {
  return (
    <FrontendLayout>
                <Navbar variant="Solid"/>
                <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
                    <div className="flex justify-between ">
                        <h2 className="text-2xl font-bold text-text md:text-3xl">
                            Properties
                        </h2>
                       
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

export default PropertiesPage 
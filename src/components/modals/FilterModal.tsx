"use client"

import Modal from "./Modal"
import { Suspense, useState } from "react";

import PropertyTypeCard from "../properties/PropertyTypeCard";
import { Button } from "../ui/Button";
import Input from "../ui/Input";
import { useFilterModalStore } from "@/src/store/useFilterModalStore";
import { propertyTypes } from "@/src/constants/PropertTypes";
import { useRouter, useSearchParams } from "next/navigation";
const STEPS = {
    TYPE: 0,
    LOCATION: 1,
    PRICE: 2
}
function FilterModalContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { close, isOpen } = useFilterModalStore();
    const [step, setStep] = useState(STEPS.TYPE);
    const [propertyType, setPropertyType] = useState(searchParams.get("propertyType") || "");
    const [location, setLocation] = useState(searchParams.get("location") || "");
    const [address, setAddress] = useState(searchParams.get("address") || "");
    const [minprice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxprice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const applyFilter = () => {
        const params = new URLSearchParams();
        if(propertyType) params.set("propertyType",propertyType)
        if(location) params.set("location",location);
        if(address) params.set("address",address);
        if(minprice) params.set("minPrice",minprice);
        if(maxprice) params.set("maxPrice",maxprice);
        router.replace(`/marketplace?${params.toString()}`);
        setStep(STEPS.TYPE);
        close() 

    }
    const stepTitle = () => {
        switch (step) {
            case STEPS.TYPE:
                return "Select property type";
                break;
            case STEPS.LOCATION:
                return "Select property location";
                break;
            case STEPS.PRICE:
                return "Select Property Price Range";
            default:
                return ""
        }
    }
    return (
        <Modal title="Filter Properties" onClose={close} isOpen={isOpen} >
            <div className="mb-6 flex items-center justify-between text-sm text-gray-500 ">
                <span>Step{step + 1} of 3</span>
                <span className="font-medium text-gray-700 ">{stepTitle()}</span>
            </div>
            <div className="min-h-55 rounded-xl text-gray-400 p-6 border border-dashed border-gray-300">
                {step === STEPS.TYPE && (
                    <div className="grid grid-cols-2 gap-4 max-h-[50vh] overflow-y-scroll no-scrollbar">
                        {propertyTypes.map((item) => (
                            <PropertyTypeCard
                                key={item.slug}
                                label={item.label}
                                icon={item.icon}
                                selected={propertyType === item.slug}
                                onClick={() => setPropertyType(item.slug)}
                            />
                        ))}
                    </div>
                )}
                {step === STEPS.LOCATION && (
                    <div className="space-y-6 w-full">
                        <Input name="location" label="Location" value={location} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)} />
                        <Input name="address" label="Address" value={address} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} />

                    </div>
                )}
                {
                    step === STEPS.PRICE && (
                        <div className="grid grid-cols-2 gap-4 ">
                            <div>
                                <Input label="Min Price" name="min-price" type="number" value={minprice} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinPrice(e.target.value)} />
                            </div>
                            <div>
                                <Input label="Max Price" name="max-price" type="number" value={maxprice} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxPrice(e.target.value)} />
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="mt-8 flex gap-3 ">
                {step > STEPS.TYPE && (
                    <Button variant="outline" fullWidth onClick={() => setStep((prev) => prev - 1)}>
                        Back
                    </Button>
                )}
                <Button fullWidth onClick={() => step < STEPS.PRICE ? setStep((prev) => prev + 1) : applyFilter()} >
                    {step === STEPS.PRICE ? "Apply Filter" : "Next"}

                </Button>

            </div>
        </Modal>
    )
}

export default function FilterModal() {
    return (
        <Suspense >
            <FilterModalContent />
        </Suspense>
    )
}
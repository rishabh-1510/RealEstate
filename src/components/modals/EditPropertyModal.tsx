'use client'
import Modal from "./Modal"
import { useEffect, useState } from "react"
import { Button } from "../ui/Button"
import axios from 'axios'
import PropertyTypeCard from "../properties/PropertyTypeCard"
import Input from "../ui/Input"
import Counter from "../properties/Counter"
import ImageUpload from "../properties/ImageUpload"
import { propertyTypes } from "@/src/constants/PropertTypes"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Property } from "@/src/types/property"

const STEPS = {
    TYPE: 0,
    LOCATION: 1,
    DETAILS: 2,
    FEATURE: 3,
    IMAGE: 4,
    PRICING: 5
}
interface EditPropertyModalProps {
    property: Property;
    isOpen: boolean;
    onClose: () => void;
}

const EditPropertyModal = ({ property, isOpen, onClose }: EditPropertyModalProps) => {
    console.log('property is ', property)
    const router = useRouter();
    const [step, setStep] = useState(STEPS.TYPE);
    const [loading, setLoading] = useState(false);
    const [propertyType, setPropertyType] = useState(property.propertyType)
    const [address, setAddress] = useState(property.address);
    const [location, setLocation] = useState(property.location);
    const [bedRooms, setBedrooms] = useState(property.bedrooms);
    const [bathrooms, setBathrooms] = useState(property.bathrooms);
    const [parking, setParking] = useState(property.parkingSpaces);
    const [area, setArea] = useState(property.area);
    const [title, setTitle] = useState(property.title);
    const [description, setDescription] = useState(property.description);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(property.image);
    const [listingType, setListingType] = useState<"rent" | "sale">(property.listingType as "rent" | "sale");
    const [price, setPrice] = useState(property.price);
    useEffect(() => {
        if (!isOpen) return;

        setPropertyType(property.propertyType);
        setAddress(property.address);
        setLocation(property.location);
        setBedrooms(property.bedrooms);
        setBathrooms(property.bathrooms);
        setParking(property.parkingSpaces);
        setArea(property.area);
        setTitle(property.title);
        setDescription(property.description);
        setListingType(property.listingType as "rent" | "sale");
        setPrice(property.price);
        setPreview(property.image);
        setImage(null);
    }, [property, isOpen]);
    const stepTitle = () => {
        switch (step) {
            case STEPS.TYPE:
                return "Select property type";
                break;
            case STEPS.LOCATION:
                return "Where is the property located?";
                break;
            case STEPS.DETAILS:
                return "Share Some Basic about your place";
                break;
            case STEPS.FEATURE:
                return "Propert Description";
                break;
            case STEPS.IMAGE:
                return "Upload Property Image";
            case STEPS.PRICING:
                return "Set Property Price";
            default:
                return ""
        }
    }
    const handleImageChange = (file: File) => {
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }

    const editListing = async () => {

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", String(price));
            formData.append("location", location);
            formData.append("address", address);
            formData.append("area", String(area));
            formData.append("propertyType", propertyType);
            formData.append("listingType", listingType);
            formData.append("bedrooms", bedRooms.toString());
            formData.append("bathrooms", bathrooms.toString());
            formData.append("parkingSpaces", parking.toString());
            if (image) {
                formData.append("image", image)
            }

            await axios.put(`/api/properties/${property.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            toast.success("Property Updated successfully");
            router.refresh();
            handleClose();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.error || "Something Went wrong");
                return;
            }
        } finally {
            setLoading(false);
        }
    }
    const handleClose = () => {
        setStep(STEPS.TYPE);
        onClose();
    }

    return (
        <Modal isOpen={isOpen}
            onClose={onClose}
            title="Edit Property" >
            <div className="mb-6 flex items-center justify-between text-sm text-gray-500 ">
                <span>Step{step + 1} of 6</span>
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
                {step === STEPS.DETAILS && (
                    <div className="flex flex-col">
                        <div className="spcae-y-4">
                            <Counter title='Bedrooms' subTitle="How many bedrooms" value={bedRooms} onChange={setBedrooms} />
                        </div>
                        <div className="spcae-y-4">
                            <Counter title='Bathrooms' subTitle="How many bathrooms" value={bathrooms} onChange={setBathrooms} />
                        </div>
                        <div className="spcae-y-4">
                            <Counter title='Parking' subTitle="How many parking spaces" value={parking} onChange={setParking} />
                        </div>
                        <Input name="area" label="Property Area (sqft)" type="number" value={String(area)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArea(Number((e.target.value)))} />
                    </div>

                )}
                {
                    step === STEPS.FEATURE && (
                        <div className="space-y-6 ">
                            <Input name="title" label="Property Title" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
                            <Input as="textarea" name="description" label="Property Description" value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
                        </div>
                    )
                }
                {
                    step === STEPS.IMAGE && (
                        <ImageUpload preview={preview} onChange={handleImageChange} />
                    )
                }
                {
                    step === STEPS.PRICING && (
                        <div className="space-y-6">
                            <select value={listingType} onChange={(e) => setListingType(e.target.value as "sale" | "rent")} className="h-13
                            w-full rounded-2xl border border-black/10 px-4 " >
                                <option value="rent">For Rent</option>
                                <option value="sale">For Sale</option>
                            </select>
                            <Input name="price" label={listingType === "sale" ? "Sale Price" : "Monthly Rent"} type="number" value={String(price)}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setPrice(Number(e.target.value))
                                }} />
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
                <Button fullWidth onClick={() => step < STEPS.PRICING ? setStep((prev) => prev + 1) : editListing()} loading={loading}>
                    {step === STEPS.PRICING ? "Update Property" : "Next"}

                </Button>

            </div>
        </Modal >
    )
}

export default EditPropertyModal
'use client'
import { ReactNode, useState } from "react";
import DeletePropertyModal from "../modals/DeletePropertyModal";
import EditPropertyModal from "../modals/EditPropertyModal";
import { Property } from "@prisma/client";
import { deleteProperty } from "@/src/server-actions/deleteProperty";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LuTrash2 } from "react-icons/lu";
interface OwnerActionsProps {
    property: Property
}

export default function OwnerActions({ property }: OwnerActionsProps) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const router = useRouter()
    const deletePropertyApi = async () => {
        const result = await deleteProperty(property?.id);
        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);
        router.replace("/");
    }
    return (
        <div>
            <div className="flex gap-3 mt-6">
                <button
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-red-700 hover:shadow-md active:scale-95"
                    onClick={() => setIsDeleteOpen(true)}
                >
                    <LuTrash2 size={16} />
                    Delete Property
                </button>
                <button
                    onClick={() => setIsEditOpen(true)}
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95"
                >
                    Edit Property
                </button>
            </div>
            <DeletePropertyModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} propertyTitle={property.title} onConfirm={async () => {
                await deletePropertyApi()
                // e.g. refetch list or show toast
            }} />
            <EditPropertyModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                property={property}
            />

        </div>
    )
}

import { prisma } from "@/src/database/db";
import cloudinary from "@/src/lib/cloudinary";
import { getCurrentUser } from "@/src/server-actions/getCurretnUser";
import { CloudinaryUploadResult, uploadToCloudinary } from "@/src/services/cloudinary";

import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const price = formData.get("price") as string;
        const description = formData.get("description") as string;
        const propertyType = formData.get("propertyType") as string;
        const listingType = formData.get("listingType") as string;
        const bedrooms = formData.get("bedrooms") as string;
        const bathrooms = formData.get("bathrooms") as string;
        const parkingSpaces = formData.get("parkingSpaces") as string;
        const location = formData.get("location") as string;
        const address = formData.get("address") as string;
        const area = formData.get("area") as string;
        const image = formData.get("image") as File | null;
        const existingProperty = await prisma.property.findFirst({
            where: {
                id,
                ownerId: currentUser.id,
            }
        })
        let imageUrl = existingProperty?.image;
        let imagePublicId = existingProperty?.imagePublicId;
        if (!existingProperty) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Property not found"
                },
                { status: 404 }
            );
        }
        if (image && image.size > 0) {
            // upload image to cloudinary
            if (imagePublicId) {
                await cloudinary.uploader.destroy(imagePublicId);
            }
            const imageData: CloudinaryUploadResult = await uploadToCloudinary(image);
            imageUrl = imageData.secure_url;
            imagePublicId = imageData.public_id

        };
        await prisma.property.update({
            where: {
                id
            },
            data: {
                title,
                description,
                image: imageUrl,
                imagePublicId,
                price: Number(price),
                location,
                address,
                area: area ? Number(area) : null,
                propertyType,
                listingType,
                bedrooms: Number(bedrooms),
                bathrooms: Number(bathrooms),
                parkingSpaces: Number(parkingSpaces),
            }
        })
        return NextResponse.json({
            success: true,
            message: "Property updated successfully"
        });

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong"
            },
            { status: 500 }
        );
    }
}
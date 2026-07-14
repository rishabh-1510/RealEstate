import { prisma } from "@/src/database/db";
import { getCurrentUser } from "@/src/server-actions/getCurretnUser";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            },
                {
                    status: 401
                }
            )
        }
        const { propertyId } = await req.json();
        const property = await prisma.property.findUnique({
            where: {
                id: propertyId
            }
        });
        if (!property) {
            return NextResponse.json({
                success: false,
                message: "Property not found"
            },
                {
                    status: 404
                }
            )
        }
        //check already favourite 
        const existingFavorite = await prisma.favorite.findUnique({
            where: {
                userId_propertyId: {
                    userId: currentUser.id,
                    propertyId
                }
            }
        });
        if (existingFavorite) {
            if (existingFavorite) {
                await prisma.favorite.delete({
                    where: {
                        userId_propertyId: {
                            userId: currentUser.id,
                            propertyId,
                        },
                    },
                });

                return NextResponse.json({
                    success: true,
                    isFavorite: false,
                    message: "Removed from favorites",
                });
            }

        }
        await prisma.favorite.create({
            data: {
                userId: currentUser.id,
                propertyId,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Property added to favorites",
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }

}
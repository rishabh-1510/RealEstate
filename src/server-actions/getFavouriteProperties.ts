import { prisma } from "../database/db";
import { getCurrentUser } from "./getCurretnUser";

export async function getFavoriteProperties() {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const favorites = await prisma.favorite.findMany({
        where: {
            userId: currentUser.id,
        },
        select: {
            propertyId: true,
        },
    });

    return favorites.map((favorite) => favorite.propertyId);
}
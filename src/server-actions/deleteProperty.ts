"use server";

import { prisma } from "@/src/database/db";
import { getCurrentUser } from "./getCurretnUser";

export async function deleteProperty(propertyId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    });

    if (!property) {
      return {
        success: false,
        message: "Property not found",
      };
    }

    // Ensure only the owner can delete
    if (property.ownerId !== currentUser.id) {
      return {
        success: false,
        message: "You are not allowed to delete this property",
      };
    }

    await prisma.property.delete({
      where: {
        id: propertyId,
      },
    });

    return {
      success: true,
      message: "Property deleted successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
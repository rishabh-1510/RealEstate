'use client';

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";

interface FavoriteButtonProps {
    propertyId: string;
    user: boolean;
    isFavorite: boolean;

}

export default function FavoriteButton({
    propertyId,
    user,
    isFavorite
}: FavoriteButtonProps) {
    useEffect(() => {
        setFavorite(isFavorite);
    }, [isFavorite]);
    const router = useRouter();
    const [favorite, setFavorite] = useState(isFavorite);
    const handleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            toast.error("Please login first");
            return;
        }

        // Optimistically update UI
        setFavorite(prev => !prev);

        try {
            const response = await axios.post("/api/favorites", {
                propertyId,
            });

            toast.success(response.data.message);

            // Sync with server response
            setFavorite(response.data.isFavorite);
        } catch {
            // Rollback on error
            setFavorite(prev => !prev);
            toast.error("Something went wrong");
        }
    };

    if (!user) return null;

    return (
        <button
            onClick={handleFavorite}
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80"
        >
            {favorite ? (
                <FaHeart className="text-red-500" size={20} />
            ) : (
                <FaRegHeart size={20} />
            )}
        </button>
    );
}
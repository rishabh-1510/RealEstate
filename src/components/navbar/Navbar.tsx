"use client"
import Link from "next/link";
import { Button } from "../ui/Button";
import { FaHome } from "react-icons/fa";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAuthModal } from "@/src/store/useAuthModalStore";
import { useCreatePropertyModal } from "@/src/store/useCreatePropertyModalStore";
import { authClient } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

interface NavbarProps {
    variant: "transparent" | "Solid"
}

const navLinks = ["Home", "Properties", "MarketPlace"];

export const Navbar = ({ variant = "transparent" }: NavbarProps) => {
    const isTranparent = variant === "transparent";
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession()

    // mirror session with a delay so the button swap doesn't feel instant/jarring
    const [displaySession, setDisplaySession] = useState(session);
    const [isSwapping, setIsSwapping] = useState(false);

    useEffect(() => {
        // only delay when session goes from null -> value (i.e. just logged in)
        if (session && !displaySession) {
            setIsSwapping(true);
            const timer = setTimeout(() => {
                setDisplaySession(session);
                setIsSwapping(false);
            }, 1200); // matches your toast delay
            return () => clearTimeout(timer);
        }
        // logout / other changes can update immediately
        if (!session) {
            setDisplaySession(session);
        }
    }, [session]);

    const [isOpen, setIsOpen] = useState(false);
    const { openLogin } = useAuthModal();
    const { open: openCreateModal } = useCreatePropertyModal();

    const handleLogout = async () => {
        await authClient.signOut();
        setDisplaySession(null);
        router.refresh();
    }

    return (
        <section className={`top-0 left-0 z-50 w-full 
        ${isTranparent ? `absolute` : `sticky border-b border-black/5 bg-card`}`}>
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <nav className={`flex h-20 items-center justify-between
                ${isTranparent ? `mt-6 rounded-3xl border border-white/10 bg-white/5 px-6 backdrop-blur-2xl` : `px-0 `}`}>
                    <Link href={'/'} className="flex items-center text-2xl font-semibold ">
                        <span className={`${isTranparent ? `text-gray-300` : `text-text`}`}>
                            Next
                        </span>
                        <span className="bg-primary text-white px-2 py-1 rounded-tr-2xl rounded-bl-2xl">
                            Estates
                        </span>
                    </Link>

                    <div className="hidden items-center gap-8 lg:flex">
                        {navLinks.map((item) => (
                            <Link key={item} href={item == "Home" ? "/" : `${item.toLowerCase()}`} className={`text-sm font-medium transition hover:text-primary
                            ${isTranparent ? `text-white/80` : `text-text/70`}`}>
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden lg:flex items-center gap-4 ">
                        <div className={`flex items-center gap-4 transition-opacity duration-300 ${isSwapping ? "opacity-50" : "opacity-100"}`}>
                            {displaySession ? (
                                <Button variant="outline" onClick={handleLogout}>
                                    Logout
                                </Button>
                            ) : (
                                <Button variant="outline" onClick={openLogin}>
                                    Login
                                </Button>
                            )}
                            {!isPending && displaySession && (
                                <Button icon={<FaHome />} iconPosition="right" variant="outline" onClick={openCreateModal}>
                                    Add Property
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Mobile Button */}
                    <button className={`
                        flex h-11 w-11 items-center justify-center
                        rounded-2xl transition lg:hidden
                        ${isTranparent ? "border border-white/10 bg-white/5 text-white " : "border border-black/10 bg-background text-text"}`}
                        onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <IoClose /> : <HiOutlineMenuAlt3 />}
                    </button>
                </nav>

                {isOpen && (
                    <div className={`mt-4 rounded-3xl p-6 backdrop-blur-2xl lg:hidden 
                        ${isTranparent ? `border border-white/10 bg-secondary/95 ` : `border border-black/5 bg-white`}`}>
                        <div className="flex flex-col gap-5 ">
                            {navLinks.map((item) => (
                                <Link key={item} href={item == "Home" ? "/" : `${item.toLowerCase()}`} className={` transition hover:text-primary
                                        ${isTranparent ? `text-white/80` : `text-white/70`}`}>
                                    {item}
                                </Link>
                            ))}
                            <div className={`flex flex-col gap-3 mt-4 transition-opacity duration-300 ${isSwapping ? "opacity-50" : "opacity-100"}`}>
                                {displaySession ? (
                                    <Button variant="outline" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                ) : (
                                    <Button variant="outline" onClick={openLogin}>
                                        Login
                                    </Button>
                                )}
                                {!isPending && displaySession && (
                                    <Button icon={<FaHome />} iconPosition="right" variant="outline" onClick={openCreateModal}>
                                        Add Property
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
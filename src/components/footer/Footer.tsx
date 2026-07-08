import Link from 'next/link'
export const Footer = () => {
    const navLinks = ["Home", "Properties", "MarketPlace"];
    return (
        <footer className='border-t border-black/5 bg-background'>
            <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center lg:flex-row lg:px-12  '>
                <Link href={'/'} className="flex items-center text-2xl font-semibold ">
                    <span className={`text-text`}>
                        Next
                    </span>
                    <span className="bg-primary text-white px-2 py-1 rounded-tr-2xl rounded-bl-2xl">
                        Estates
                    </span>
                </Link>
                <div className="items-center gap-8 flex">
                    {navLinks.map((item) => (
                        <Link key={item} href={item == "Home" ? "/" : `/${item.toLowerCase()}`} className={`text-sm font-medium transition hover:text-primary
                            text-text/70`}>
                            {item}
                        </Link>
                    ))}
                </div>
                <p className='text-sm text-text/60'>
                    &copy; 2026 NextEstate
                </p>
            </div>
        </footer>
    )
}

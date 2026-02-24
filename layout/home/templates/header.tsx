import { getInitialTheme } from "@/lib/util/get-initial-theme";
import HeaderClient from "../components/header-client";
import HeaderServer from "../components/header-server";
import { navLinks } from "@/lib/constant/data";
import { fetchCartItemCount } from "@/lib/action/cart";

export default async function Header() {
    const initialTheme = await getInitialTheme()
    const totalItems = await fetchCartItemCount()
    return (
        <HeaderClient initialTheme={initialTheme} totalItems={totalItems}>
            <HeaderServer links={navLinks} />
        </HeaderClient>
    )
}
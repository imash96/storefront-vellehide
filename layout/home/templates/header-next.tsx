import { fetchCartItemCount } from "@/lib/action/cart";
import { getInitialTheme } from "@/lib/util/get-initial-theme";
import HeaderClient from "../components/header-client-next";
import HeaderNav from "../components/header-nav-next";

export default async function Header() {
    const initialTheme = await getInitialTheme()
    const totalItems = await fetchCartItemCount()

    return (
        <HeaderClient initialTheme={initialTheme} totalItems={totalItems} >
            <HeaderNav />
        </HeaderClient>
    )
}
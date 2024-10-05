import { Children, FC, PropsWithChildren } from "react";
import { TypeComponentAuthFields } from "./auth-page.types";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

const CheckRole: 
FC<PropsWithChildren<TypeComponentAuthFields>> =
({Component: {
    isOnlyUser
},children}) => {
    const {user} = useAuth()

    const router = useRouter()

    if (user && isOnlyUser) return <>{children}</>

    
        router.pathname != '/auth' && router.replace('/auth')
        return null
    
}
export default CheckRole
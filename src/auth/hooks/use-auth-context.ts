import { useContext } from "react";
import { AuthContext } from "../context";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuthContext context must be used inside auth provider')

    return context;
}
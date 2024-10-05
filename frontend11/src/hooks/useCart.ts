import { useTypedSelector } from "./useTypedSelector";
import { TypeRootState } from "@/store/store";

export const useCart = () => useTypedSelector(state => state.cart)
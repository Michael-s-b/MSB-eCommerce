import { useQuery } from "react-query";
import { fetchCart } from "../api";
import { Cart as CartType } from "@chec/commerce.js/types/cart";

const useFetchCart = () => {
	return useQuery<CartType, Error>("cart", fetchCart, {
		staleTime: 900000,
		cacheTime: 990000,
		refetchInterval: 900000,
	});
};
export default useFetchCart;

import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { useQuery } from "react-query";
import { fetchCheckoutToken } from "../api";

const useFetchCheckoutToken = (cartId: string | undefined) => {
	return useQuery<CheckoutToken>(
		["checkoutToken", cartId],
		() => {
			return fetchCheckoutToken(cartId);
		},
		{
			enabled: !!cartId,
		}
	);
};
export default useFetchCheckoutToken;

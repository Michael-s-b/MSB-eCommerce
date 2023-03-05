import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import { CheckoutCaptureResponse } from "@chec/commerce.js/types/checkout-capture-response";
import { useQuery } from "react-query";
import { fetchIncomingOrder } from "../api";
import { commerce } from "../api/commerce";

const useCaptureCheckout = (
	checkoutTokenId: string | undefined,
	newOrder: CheckoutCapture | undefined,
	onSuccess?: ((data: CheckoutCaptureResponse) => void) | undefined
) => {
	return useQuery<CheckoutCaptureResponse>(
		["captured-checkout", checkoutTokenId, newOrder],
		() => {
			return fetchIncomingOrder(checkoutTokenId, newOrder);
		},
		{
			onSuccess,
			enabled: !!checkoutTokenId && !!newOrder,
			staleTime: 30000,
			keepPreviousData: true,
		}
	);
};
export default useCaptureCheckout;

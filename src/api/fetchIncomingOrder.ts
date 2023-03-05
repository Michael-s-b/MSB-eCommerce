import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import { commerce } from "./commerce";

const fetchIncomingOrder = async (
	checkoutTokenId: string | undefined,
	newOrder: CheckoutCapture | undefined
) => {
	if (checkoutTokenId && newOrder) {
		const incomingOrder = await commerce.checkout.capture(
			checkoutTokenId,
			newOrder
		);
		return incomingOrder;
	}
	throw new Error("checkout token id undefined");
};
export default fetchIncomingOrder;

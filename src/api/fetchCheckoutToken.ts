import { commerce } from "./commerce";

const fetchCheckoutToken = async (cartId: string | undefined) => {
	if (cartId) {
		const data = await commerce.checkout.generateToken(cartId, {
			type: "cart",
		});
		return data;
	} else {
		throw new Error("cartId is undefined");
	}
};

export default fetchCheckoutToken;

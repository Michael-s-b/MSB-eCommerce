// Define functions to fetch products and cart from Commerce.js API
import { Cart as CartType } from "@chec/commerce.js/types/cart";
import { commerce } from "./commerce";
export const fetchProducts = async () => {
	const { data } = await commerce.products.list();
	return data;
	//setProducts(data);
};
export const fetchCart = async () => {
	const data = await commerce.cart.retrieve();
	return data;
};
export const fetchCheckoutToken = async (cartId: string | undefined) => {
	if (cartId) {
		const data = await commerce.checkout.generateToken(cartId, {
			type: "cart",
		});
		return data;
	} else {
		throw new Error("cartId is undefined");
	}
};

export const fetchShippingCountries = async (
	checkoutTokenId: string | undefined
) => {
	if (checkoutTokenId) {
		const data = await commerce.services.localeListShippingCountries(
			checkoutTokenId
		);
		return data;
	} else {
		throw new Error("checkoutTokenId is undefined");
	}
};

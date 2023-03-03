import { commerce } from "./commerce";
const fetchShippingOptions = async (
	checkoutTokenId: string | undefined,
	shippingCountry: string | undefined,
	shippingSubdivision: string | undefined
) => {
	if (checkoutTokenId && shippingCountry && shippingSubdivision) {
		const options = await commerce.checkout.getShippingOptions(
			checkoutTokenId,
			{ country: shippingCountry, region: shippingSubdivision }
		);
		return options;
	} else {
		throw new Error("checkoutTokenId is undefined");
	}
};
export default fetchShippingOptions;

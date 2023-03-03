import { commerce } from "./commerce";

const fetchShippingCountries = async (checkoutTokenId: string | undefined) => {
	if (checkoutTokenId) {
		const data = await commerce.services.localeListShippingCountries(
			checkoutTokenId
		);
		return data;
	} else {
		throw new Error("checkoutTokenId is undefined");
	}
};
export default fetchShippingCountries;

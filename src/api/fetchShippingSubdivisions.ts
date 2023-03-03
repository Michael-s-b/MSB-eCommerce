import { commerce } from "./commerce";

const fetchShippingSubdivisions = async (countryCode: string) => {
	const { subdivisions } = await commerce.services.localeListSubdivisions(
		countryCode
	);
	return subdivisions;
};
export default fetchShippingSubdivisions;

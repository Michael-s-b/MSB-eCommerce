import { useQuery } from "react-query";
import { fetchShippingSubdivisions } from "../api";

const useFetchShippingSubdivisions = (countryCode: string) => {
	return useQuery<
		{
			[name: string]: string;
		},
		undefined,
		CountrySubdivision[]
	>(
		["country-shipping-subdivisions", countryCode],
		() => fetchShippingSubdivisions(countryCode),
		{
			enabled: !!countryCode,
			select: (subdivisions) => {
				const formatedSubdivisions = Object.entries(subdivisions).map(
					([code, name]) => {
						return { id: code, label: name };
					}
				);
				return formatedSubdivisions;
			},
		}
	);
};
export default useFetchShippingSubdivisions;
interface CountrySubdivision {
	id: string;
	label: string;
}

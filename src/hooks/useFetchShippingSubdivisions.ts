import { useQuery } from "react-query";
import { fetchShippingSubdivisions } from "../api";
// so funcione quando paises estiver pronto, isto é, quando nao estiver fetching, nem loading etc
const useFetchShippingSubdivisions = (
	countryCode: string,
	isCountriesLoading?: boolean,
	isFetchingCountries?: boolean
) => {
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
			enabled:
				!!countryCode && !isCountriesLoading && !isFetchingCountries,

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

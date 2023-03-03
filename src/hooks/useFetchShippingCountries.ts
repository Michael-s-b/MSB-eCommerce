import { LocaleListCountriesResponse } from "@chec/commerce.js/features/services";
import { useQuery } from "react-query";
import { fetchShippingCountries } from "../api";

const useFetchShippingCountries = (checkoutTokenId: string | undefined) => {
	return useQuery<LocaleListCountriesResponse, undefined, ShippingCountry[]>(
		["countries"],
		() => {
			return fetchShippingCountries(checkoutTokenId);
		},
		{
			enabled: !!checkoutTokenId,
			select: ({ countries }) => {
				const formatedCountries = Object.entries(countries).map(
					([code, name]) => {
						return { id: code, label: name };
					}
				);
				return formatedCountries;
			},
		}
	);
};
export default useFetchShippingCountries;

export interface ShippingCountry {
	id: string;
	label: string;
}

import { GetShippingOptionsResponse } from "@chec/commerce.js/features/checkout";
import { useQuery } from "react-query";
import { fetchShippingOptions } from "../api";

const useFetchShippingOptions = (
	checkoutTokenId: string | undefined,
	shippingCountry: string | undefined,
	shippingSubdivision: string | undefined
) => {
	return useQuery<GetShippingOptionsResponse[], undefined, ShippingOptions[]>(
		[
			"country-shipping-options",
			checkoutTokenId,
			shippingCountry,
			shippingSubdivision,
		],
		() =>
			fetchShippingOptions(
				checkoutTokenId,
				shippingCountry,
				shippingSubdivision
			),
		{
			enabled:
				!!checkoutTokenId && !!shippingCountry && !!shippingSubdivision,
			select: (data) => {
				const formatedOptions = data.map((option) => {
					return {
						id: option.id,
						label: `${option.description} - ${option.price.formatted_with_symbol}`,
					};
				});
				return formatedOptions;
			},
		}
	);
};
export default useFetchShippingOptions;

interface ShippingOptions {
	id: string;
	label: string;
}

import { Product } from "@chec/commerce.js/types/product";
import { useQuery, useQueryClient } from "react-query";
import { fetchProduct } from "../api";

const useFetchProduct = (productId: string | undefined) => {
	const queryClient = useQueryClient();
	return useQuery(["product", productId], () => fetchProduct(productId), {
		initialData: () => {
			const product = queryClient
				.getQueryData<Product[]>("products")
				?.find((product) => {
					return product.id === productId;
				});
			if (product) {
				return { ...product, assets: [product.image] };
			}
		},
	});
};
export default useFetchProduct;

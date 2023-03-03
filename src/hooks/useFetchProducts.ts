import { Product } from "@chec/commerce.js/types/product";
import { useQuery } from "react-query";
import { fetchProducts } from "../api";

const useFetchProducts = () => {
	return useQuery<Product[], Error>("products", fetchProducts, {
		staleTime: 900000,
		cacheTime: 990000,
		refetchInterval: 900000,
	});
};
export default useFetchProducts;

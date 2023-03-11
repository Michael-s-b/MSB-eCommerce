import { useQuery } from "react-query";
import { fetchProduct } from "../api";

const useFetchProduct = (productId: string | undefined) => {
	return useQuery(["product", productId], () => fetchProduct(productId));
};
export default useFetchProduct;

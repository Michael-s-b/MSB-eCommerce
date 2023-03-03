import { commerce } from "./commerce";

export const fetchProducts = async () => {
	const { data } = await commerce.products.list();
	return data;
};
export default fetchProducts;

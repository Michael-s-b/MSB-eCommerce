import { commerce } from "./commerce";

const fetchProduct = async (productId: string | undefined) => {
	if (productId) {
		const product = await commerce.products.retrieve(productId);
		return product;
	} else {
		throw new Error("product if undefined");
	}
};
export default fetchProduct;

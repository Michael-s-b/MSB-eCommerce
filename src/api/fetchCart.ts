import { commerce } from "./commerce";

const fetchCart = async () => {
	const data = await commerce.cart.retrieve();
	return data;
};
export default fetchCart;

import { useMutation } from "react-query";
import { queryClient } from "..";
import { commerce } from "../api/commerce";

const useAddToCart = () =>
	useMutation(
		(variables: { productId: string; quantity: number }) =>
			commerce.cart.add(variables.productId, variables.quantity),
		{
			onSuccess: (data) => {
				queryClient.setQueryData("cart", data);
			},
		}
	);
export default useAddToCart;

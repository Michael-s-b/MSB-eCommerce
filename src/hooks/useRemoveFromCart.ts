import { useMutation } from "react-query";
import { queryClient } from "..";
import { commerce } from "../api/commerce";

const useRemoveFromCart = () =>
	useMutation(
		(productId: string) => {
			return commerce.cart.remove(productId);
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData("cart", data);
			},
		}
	);
export default useRemoveFromCart;

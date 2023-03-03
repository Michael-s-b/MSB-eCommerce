import { useMutation } from "react-query";
import { queryClient } from "..";
import { commerce } from "../api/commerce";

const useEmptyCart = () =>
	useMutation(
		() => {
			return commerce.cart.empty();
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData("cart", data);
			},
		}
	);
export default useEmptyCart;

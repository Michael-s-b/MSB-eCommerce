import { useMutation } from "react-query";
import { queryClient } from "..";
import { commerce } from "../api/commerce";

const useRefreshCart = () =>
	useMutation(
		() => {
			return commerce.cart.refresh();
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData("cart", data);
			},
		}
	);
export default useRefreshCart;

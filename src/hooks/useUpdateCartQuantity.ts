import { useMutation } from "react-query";
import { queryClient } from "..";
import { commerce } from "../api/commerce";

const useUpdateCartQuantity = () =>
	useMutation(
		(variables: { productId: string; quantity: number }) => {
			return commerce.cart.update(variables.productId, {
				quantity: variables.quantity,
			});
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData("cart", data);
			},
		}
	);
export default useUpdateCartQuantity;

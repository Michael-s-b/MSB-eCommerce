// Import necessary dependencies and components
import { Cart as CartType } from "@chec/commerce.js/types/cart";
import { Product } from "@chec/commerce.js/types/product";
import { Products, Navbar, Cart, Checkout } from "./components";
import {
	BrowserRouter as Router,
	Route,
	Routes as Switch,
} from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { fetchCart, fetchProducts } from "./lib/reactQuery";
import { commerce } from "./lib/commerce";
import { queryClient } from ".";
function App() {
	// Set up state for products
	const {
		data: products,
		isLoading: isProductsLoading,
		error: productsError,
	} = useQuery<Product[], Error>("products", fetchProducts, {
		staleTime: 900000,
		cacheTime: 990000,
	});

	// Set up state for the cart
	const {
		data: cart,
		isLoading: isCartLoading,
		error: cartError,
		refetch: refetchCart,
	} = useQuery<CartType, Error>("cart", fetchCart);

	//Define mutation hook for
	const addToCartMutation = useMutation(
		(variables: { productId: string; quantity: number }) =>
			commerce.cart.add(variables.productId, variables.quantity),
		{
			onSuccess: (data) => {
				queryClient.setQueryData("cart", data);
			},
		}
	);

	const UpdateCartQuantityMutation = useMutation(
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

	const removeFromCartMutation = useMutation(
		(productId: string) => {
			return commerce.cart.remove(productId);
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData("cart", data);
			},
		}
	);
	const emptyCartMutation = useMutation(
		() => {
			return commerce.cart.empty();
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData("cart", data);
			},
		}
	);

	// Define function to add item to cart
	const handleAddToCart = async (productId: string, quantity: number) => {
		await addToCartMutation.mutateAsync({ productId, quantity });
	};

	// Define function to update item quantity in cart
	const handleUpdateCartQuantity = async (
		productId: string,
		quantity: number
	) => {
		await UpdateCartQuantityMutation.mutateAsync({ productId, quantity });
	};

	// Define function to remove item from cart
	const handleRemoveFromCart = async (productId: string) => {
		await removeFromCartMutation.mutateAsync(productId);
	};

	// Define function to empty the cart
	const handleEmptyCart = async () => {
		emptyCartMutation.mutateAsync();
	};

	// Set up routes using react-router-dom components
	return (
		<Router>
			{/* Pass cart total items to Navbar component */}
			<Navbar cartTotalItems={cart?.total_items} />
			<Switch>
				{/* Render Products component on homepage */}
				<Route
					path="/"
					element={
						<Products
							products={products}
							isProductsLoading={isProductsLoading}
							onAddToCart={handleAddToCart}
							error={productsError}
						/>
					}
				/>
				{/* Render Cart component on /cart page */}
				<Route
					path="cart"
					element={
						<Cart
							isCartLoading={isCartLoading}
							error={cartError}
							cart={cart}
							handleUpdateCartQuantity={handleUpdateCartQuantity}
							handleRemoveFromCart={handleRemoveFromCart}
							handleEmptyCart={handleEmptyCart}
						/>
					}
				/>
				<Route
					path="checkout"
					element={
						<Checkout
							refetchCart={refetchCart}
							isCartLoading={isCartLoading}
							cart={cart}
						/>
					}
				/>
			</Switch>
		</Router>
	);
}

export default App;

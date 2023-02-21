// Import necessary dependencies and components
import { Cart as CartType } from "@chec/commerce.js/types/cart";
import { Product } from "@chec/commerce.js/types/product";
import { useState, useEffect } from "react";
import { Products, Navbar, Cart } from "./components";
import { commerce } from "./lib/commerce";
import {
	BrowserRouter as Router,
	Route,
	Routes as Switch,
} from "react-router-dom";

function App() {
	// Set up state for products and cart
	const [products, setProducts] = useState<Product[] | undefined>(() => {
		return [];
	});

	const [cart, setCart] = useState<CartType | undefined>({} as CartType);

	// Define functions to fetch products and cart from Commerce.js API
	const fetchProducts = async () => {
		const { data } = await commerce.products.list();
		setProducts(data);
	};
	const fetchCart = async () => {
		setCart(await commerce.cart.retrieve());
	};

	// Define function to add item to cart
	const handleAddToCart = async (productId: string, quantity: number) => {
		// Call Commerce.js API to add item to cart
		//@ts-expect-error
		const newCart: CartType = await commerce.cart.add(productId, quantity);
		setCart(newCart);
	};

	// Fetch products and cart on initial render using useEffect hook
	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

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
							onAddToCart={handleAddToCart}
						/>
					}
				/>
				{/* Render Cart component on /cart page */}
				<Route path="cart" element={<Cart cart={cart} />} />
			</Switch>
		</Router>
	);
}

export default App;

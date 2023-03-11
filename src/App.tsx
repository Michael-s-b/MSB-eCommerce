import {
	Products,
	Navbar,
	Cart,
	Checkout,
	ProductDetails,
	Footer,
} from "./components/index";
import {
	BrowserRouter as Router,
	Route,
	Routes as Switch,
} from "react-router-dom";
import {
	useUpdateCartQuantity,
	useRemoveFromCart,
	useEmptyCart,
	useFetchCart,
	useFetchProducts,
} from "./hooks";
import {
	Box,
	createTheme,
	PaletteType,
	ThemeProvider,
} from "@material-ui/core";
import { useState } from "react";
import { CssBaseline } from "@material-ui/core";
const now = new Date();
const currentHour = now.getHours();
const isDarkMode = currentHour < 6 || currentHour >= 18;

function App() {
	const [themeMode, setThemeMode] = useState<PaletteType>(
		isDarkMode ? "dark" : "light"
	);
	const theme = createTheme({
		palette: {
			type: themeMode,
		},
	});
	const toggleTheme = () => {
		setThemeMode((previousTheme) => {
			console.log(themeMode);
			return previousTheme === "light" ? "dark" : "light";
		});
	};

	const removeFromCartMutation = useRemoveFromCart();
	const emptyCartMutation = useEmptyCart();
	const updateCartQuantityMutation = useUpdateCartQuantity();

	// Set up state for products

	const {
		data: products,
		isLoading: isProductsLoading,
		error: productsError,
	} = useFetchProducts();
	// Set up state for the cart
	const {
		data: cart,
		isLoading: isCartLoading,
		error: cartError,
	} = useFetchCart();

	// Define function to add item to cart

	// Define function to update item quantity in cart
	const handleUpdateCartQuantity = async (
		productId: string,
		quantity: number
	) => {
		await updateCartQuantityMutation.mutateAsync({ productId, quantity });
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
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Box>
					{/* Pass cart total items to Navbar component */}
					<Navbar
						cartTotalItems={cart?.total_items}
						toggleTheme={toggleTheme}
					/>
					<Switch>
						{/* Render Products component on homepage */}
						<Route
							path="/"
							element={
								<Products
									products={products}
									isProductsLoading={isProductsLoading}
									error={productsError}
								/>
							}
						/>
						{/* Render Cart component on /cart page */}
						<Route
							path="/cart"
							element={
								<Cart
									isCartLoading={isCartLoading}
									error={cartError}
									cart={cart}
									handleUpdateCartQuantity={
										handleUpdateCartQuantity
									}
									handleRemoveFromCart={handleRemoveFromCart}
									handleEmptyCart={handleEmptyCart}
								/>
							}
						/>
						<Route
							path="/checkout"
							element={
								<Checkout
									isCartLoading={isCartLoading}
									cart={cart}
								/>
							}
						/>
						<Route
							path="/product/:productId"
							element={<ProductDetails />}
						/>
					</Switch>
					<Footer />
				</Box>
			</ThemeProvider>
		</Router>
	);
}

export default App;

import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyle from "./styles";
import { Cart as CartType } from "@chec/commerce.js/types/cart";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
import { Loading } from "../../";
interface Props {
	cart: CartType | undefined;
	isCartLoading: boolean;
	error: Error | null;
	handleUpdateCartQuantity: Function;
	handleRemoveFromCart: Function;
	handleEmptyCart: Function;
}
const Cart: React.FC<Props> = ({
	cart,
	handleEmptyCart,
	handleRemoveFromCart,
	handleUpdateCartQuantity,
	error,
	isCartLoading,
}) => {
	console.count("Cart render");
	const classes = useStyle();
	const EmptyCart: React.FC = () => {
		return (
			<Typography variant="subtitle1">
				You have no items in your shopping cart,{" "}
				<Link to={"/"} className={classes.link}>
					start adding some
				</Link>
				!
			</Typography>
		);
	};
	const FilledCart: React.FC = () => {
		return (
			<>
				<Grid container spacing={3}>
					{cart
						? cart.line_items.map((item) => {
								return (
									<Grid
										item
										xs={12}
										sm={6}
										lg={4}
										key={item.id}>
										<CartItem
											item={item}
											handleRemoveFromCart={
												handleRemoveFromCart
											}
											handleUpdateCartQuantity={
												handleUpdateCartQuantity
											}
										/>
									</Grid>
								);
						  })
						: null}
				</Grid>
				{cart ? (
					<div className={classes.cardDetails}>
						<Typography variant="h4">
							Subtotal: {cart.subtotal.formatted_with_symbol}
						</Typography>
						<div>
							<Button
								onClick={() => {
									handleEmptyCart();
								}}
								className={classes.emptyButton}
								size="large"
								type="button"
								variant="contained"
								color="secondary">
								Empty Cart
							</Button>
							<Button
								component={Link}
								to={"/checkout"}
								className={classes.checkoutButton}
								size="large"
								type="button"
								variant="contained"
								color="primary">
								Checkout
							</Button>
						</div>
					</div>
				) : null}
			</>
		);
	};
	if (isCartLoading) {
		return <Loading />;
	}
	if (error) {
		return <h2>{error.message}</h2>;
	}
	return (
		<Container>
			<div className={classes.toolbar}></div>
			<Typography className={classes.title} variant="h3" gutterBottom>
				Your Shopping Cart
			</Typography>
			{cart && !cart.line_items.length ? <EmptyCart /> : <FilledCart />}
		</Container>
	);
};

export default Cart;

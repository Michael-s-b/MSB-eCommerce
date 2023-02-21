import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyle from "./styles";
import { Cart as CartType } from "@chec/commerce.js/types/cart";
import CartItem from "./CartItem/CartItem";
interface Props {
	cart: CartType | undefined;
}
const Cart: React.FC<Props> = ({ cart }) => {
	const classes = useStyle();
	const EmptyCart: React.FC = () => {
		return (
			<Typography variant="subtitle1">
				You have no items in your shopping cart, start adding some!
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
									<Grid item xs={12} sm={4} key={item.id}>
										<CartItem item={item} />
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
								className={classes.emptyButton}
								size="large"
								type="button"
								variant="contained"
								color="secondary">
								Empty Cart
							</Button>
							<Button
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
	if (!cart?.line_items || !cart?.subtotal) {
		return <div>"loading..."</div>;
	}
	return (
		<Container>
			<div className={classes.toolbar}></div>
			<Typography className={classes.title} variant="h3" gutterBottom>
				Your Shopping Cart
			</Typography>
			{!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
		</Container>
	);
};

export default Cart;

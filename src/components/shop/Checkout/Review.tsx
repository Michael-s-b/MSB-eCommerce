import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import {
	CheckoutToken,
	CheckoutTokenLineItem,
} from "@chec/commerce.js/types/checkout-token";
interface Props {
	checkoutToken: CheckoutToken | undefined;
}
const Review: React.FC<Props> = ({ checkoutToken }) => {
	return (
		<>
			<Typography variant="h6" gutterBottom>
				Order Summary
			</Typography>
			<List disablePadding>
				{checkoutToken &&
					checkoutToken.line_items.map(
						(product: CheckoutTokenLineItem) => {
							return (
								<ListItem
									style={{ padding: "10px 0" }}
									key={product.name}>
									<ListItemText
										primary={product.name}
										secondary={`Quantity: ${product.quantity}`}
									/>
									<Typography variant="body2">
										{product.price.formatted_with_symbol}
									</Typography>
								</ListItem>
							);
						}
					)}
				<ListItem style={{ padding: "10px 0" }}>
					<ListItemText primary="Total" />
					<Typography variant="subtitle1" style={{ fontWeight: 700 }}>
						{checkoutToken &&
							//@ts-ignore
							checkoutToken.subtotal.formatted_with_symbol}
					</Typography>
				</ListItem>
			</List>
		</>
	);
};

export default Review;

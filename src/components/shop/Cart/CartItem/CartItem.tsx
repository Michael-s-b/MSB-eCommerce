import React from "react";
import {
	Typography,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
} from "@material-ui/core";
import useStyles from "./styles";
import { LineItem } from "@chec/commerce.js/types/line-item";
import { Delete } from "@material-ui/icons";
interface Props {
	item: LineItem;
	handleUpdateCartQuantity: Function;
	handleRemoveFromCart: Function;
}
const CartItem: React.FC<Props> = ({
	item,
	handleRemoveFromCart,
	handleUpdateCartQuantity,
}) => {
	const classes = useStyles();
	return (
		<Card>
			<CardMedia image={item.image?.url} className={classes.media} />
			<CardContent className={classes.cardContent}>
				<Typography noWrap variant="h4">
					{item.name}
				</Typography>
				<Typography variant="h5">
					{item.price.formatted_with_symbol}
				</Typography>
			</CardContent>
			<CardActions className={classes.cartActions}>
				<div className={classes.buttons}>
					<Button
						onClick={() => {
							const newValue = item.quantity - 1;
							handleUpdateCartQuantity(item.id, newValue);
						}}
						variant="outlined"
						type="button"
						size="small">
						-
					</Button>
					<Typography style={{ paddingInline: "0.5em" }}>
						{item.quantity}
					</Typography>

					<Button
						onClick={() => {
							const newValue = item.quantity + 1;
							handleUpdateCartQuantity(item.id, newValue);
						}}
						variant="outlined"
						type="button"
						size="small">
						+
					</Button>
				</div>
				<Button
					onClick={() => {
						handleRemoveFromCart(item.id);
					}}
					startIcon={<Delete />}
					variant="outlined"
					type="button"
					color="secondary">
					Remove
				</Button>
			</CardActions>
		</Card>
	);
};

export default CartItem;

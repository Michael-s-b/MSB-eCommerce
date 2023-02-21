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
}
const CartItem: React.FC<Props> = ({ item }) => {
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
					<Button variant="outlined" type="button" size="small">
						-
					</Button>
					<Typography style={{ paddingInline: "0.5em" }}>
						{item.quantity}
					</Typography>

					<Button variant="outlined" type="button" size="small">
						+
					</Button>
				</div>
				<Button
					startIcon={<Delete />}
					variant="outlined"
					type="button"
					color="secondary"
					onClick={() => {
						alert("clicked");
					}}>
					Remove
				</Button>
			</CardActions>
		</Card>
	);
};

export default CartItem;

import React from "react";
import {
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";
import { Product as ProductType } from "@chec/commerce.js/types/product";
interface Props {
	product: ProductType | undefined;
	onAddToCart: Function;
}
const Product: React.FC<Props> = ({ product, onAddToCart }) => {
	const classes = useStyles();
	// console.log(product);

	if (!product) {
		return null;
	}

	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.media}
				image={product.image?.url}
				title={product.name}
			/>
			<CardContent>
				<div className={classes.cardContent}>
					<Typography variant="h5" gutterBottom noWrap>
						{product.name}
					</Typography>
					<Typography variant="h5">
						{product.price.formatted_with_symbol}
					</Typography>
				</div>
				<Typography
					dangerouslySetInnerHTML={{
						__html: product.description,
					}}
					variant="body2"
					color="textSecondary"
				/>
			</CardContent>
			<CardActions
				onClick={() => {
					onAddToCart(product.id, 1);
				}}
				disableSpacing
				className={classes.cardActions}>
				<IconButton aria-label="Add to Cart">
					<AddShoppingCart />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default Product;

import React from "react";
import {
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	IconButton,
	CircularProgress,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";
import { Product as ProductType } from "@chec/commerce.js/types/product";
import { useAddToCart } from "../../../../hooks";
interface Props {
	product: ProductType | undefined;
}
const Product: React.FC<Props> = ({
	product,
	// onAddToCart,
}) => {
	const classes = useStyles();
	// console.log(product);
	const addToCartMutation = useAddToCart();
	const handleAddToCart = async (productId: string, quantity: number) => {
		await addToCartMutation.mutateAsync({ productId, quantity });
	};
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
					<Typography
						style={{ paddingInline: "0.1em" }}
						variant="h5"
						gutterBottom
						noWrap>
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
			<CardActions disableSpacing className={classes.cardActions}>
				{addToCartMutation.isLoading ? (
					<CircularProgress size={48} />
				) : (
					<IconButton
						onClick={() => {
							handleAddToCart(product.id, 1);
						}}
						aria-label="Add to Cart">
						<AddShoppingCart />
					</IconButton>
				)}
			</CardActions>
		</Card>
	);
};

export default Product;

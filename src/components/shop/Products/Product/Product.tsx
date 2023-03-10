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
import { Link } from "react-router-dom";
import _ from "lodash";
function removeHtmlTags(htmlText: string) {
	return htmlText.replace(/<\/?[^>]+(>|$)/g, "");
}

interface Props {
	product: ProductType | undefined;
}
const Product: React.FC<Props> = ({ product }) => {
	const classes = useStyles();
	const addToCartMutation = useAddToCart();
	const handleAddToCart = async (productId: string, quantity: number) => {
		await addToCartMutation.mutateAsync({ productId, quantity });
	};
	if (!product) {
		return null;
	}

	return (
		<Card className={classes.root}>
			<Link to={`product/${product.id}`}>
				<CardMedia
					// style={{ display: "flex", objectFit: "contain" }}
					className={classes.media}
					image={product.image?.url}
					title={product.name}
				/>
			</Link>
			<CardContent>
				<div className={classes.cardContent}>
					<Typography
						style={{ paddingInline: "0.1em" }}
						variant="h5"
						gutterBottom
						noWrap>
						{product.name}
					</Typography>
				</div>
				<Typography
					noWrap
					variant="body2"
					color="textSecondary"
					gutterBottom
					dangerouslySetInnerHTML={{
						__html:
							product.description
								.replace(/<[^>]+>/g, "")
								.replace(/^Sobre este item/, "")
								.slice(0, 150) + "...",
					}}></Typography>
			</CardContent>
			<CardActions disableSpacing className={classes.cardActions}>
				<>
					<Typography variant="h5" className={classes.price}>
						{product.price.formatted_with_symbol}
					</Typography>
					<div className={classes.grow}></div>
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
				</>
			</CardActions>
		</Card>
	);
};

export default Product;

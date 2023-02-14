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
import IProduct from "../../../model/IProduct";
import useStyles from "./styles";
interface ProductProps {
	product: IProduct;
}
const Product: React.FC<ProductProps> = ({ product }) => {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.media}
				image={product.image}
				title={product.name}
			/>
			<CardContent>
				<div className={classes.cardContent}>
					<Typography variant="h5" gutterBottom>
						{product.name}
					</Typography>
					<Typography variant="h5">{"$" + product.price}</Typography>
				</div>
				<Typography variant="body2" color="textSecondary">
					{product.description}
				</Typography>
			</CardContent>
			<CardActions disableSpacing className={classes.cardActions}>
				<IconButton aria-label="Add to Cart">
					<AddShoppingCart />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default Product;

Product.defaultProps = {
	product: {
		name: "Name Placeholder",
		description: "Description Placeholder",
		price: 0,
		id: "id placeholder",
		image: "image/placeholder",
	},
};

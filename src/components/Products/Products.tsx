import React from "react";
import { Grid } from "@material-ui/core";
import Product from "../Products/Product/Product";
import useStyle from "./styles";
import { Product as ProductType } from "@chec/commerce.js/types/product";
import Loading from "../Loading/Loading";
interface Props {
	products: ProductType[] | undefined;
	onAddToCart: Function;
}

const Products: React.FC<Props> = ({ products, onAddToCart }) => {
	const classes = useStyle();
	if (!products) {
		return <Loading />;
	}
	return (
		<main className={classes.content}>
			<div className={classes.toolbar}></div>
			<Grid container justifyContent="center" spacing={4}>
				{products.map((product) => {
					return (
						<Grid
							item
							key={product.id}
							xs={12}
							sm={6}
							md={4}
							lg={3}>
							<Product
								product={product}
								onAddToCart={onAddToCart}
							/>
						</Grid>
					);
				})}
			</Grid>
		</main>
	);
};

export default Products;

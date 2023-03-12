import React from "react";
import { Grid, Slide } from "@material-ui/core";
import Product from "../Products/Product/Product";
import useStyle from "./styles";
import { Product as ProductType } from "@chec/commerce.js/types/product";
import { Loading } from "../../";
interface Props {
	products: ProductType[] | undefined;
	isProductsLoading: boolean;
	error: Error | null;
}

const Products: React.FC<Props> = ({ products, isProductsLoading, error }) => {
	console.count("Products render");
	const classes = useStyle();
	if (isProductsLoading) {
		return <Loading />;
	}
	if (error) {
		return <h2>{error.message}</h2>;
	}
	return (
		<main className={classes.content}>
			<div className={classes.toolbar}></div>

			<Grid container justifyContent="center" spacing={4}>
				{products &&
					products.map((product, index) => {
						return (
							<Slide
								in={!isProductsLoading}
								key={product.id}
								timeout={(index + 1) * 500}>
								<Grid item xs={12} sm={6} md={4} lg={3}>
									<Product product={product} />
								</Grid>
							</Slide>
						);
					})}
			</Grid>
		</main>
	);
};

export default Products;

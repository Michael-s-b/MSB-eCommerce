import React from "react";
import { Grid } from "@material-ui/core";
import Product from "../Products/Product/Product";
import IProduct from "../../model/IProduct";
import useStyle from "./styles";
const products: IProduct[] = [
	{
		id: 1,
		name: "Adidas Shoes",
		description: "Adidas running shoes",
		price: 50,
		image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7059495d78b342448a41ade401408eb1_9366/Racer_TR21_Running_Shoes_Black_GX0651_01_standard.jpg",
	},
	{
		id: 2,
		name: "Macbook",
		description: "Apple macbook",
		price: 1200,
		image: "https://www.apple.com/la/macbook-pro/images/overview/hero_13__d1tfa5zby7e6_large.jpg",
	},
	{
		id: 3,
		name: "RTX 3060",
		description: "Nvidia GPU",
		price: 500,
		image: "https://images.nvidia.com/aem-dam/Solutions/geforce/ampere/rtx-3060-ti/geforce-rtx-3060-ti-product-gallery-full-screen-3840-2-bl.jpg",
	},
	{
		id: 4,
		name: "Ryzen 5600X",
		description: "AMD CPU",
		price: 249,
		image: "https://www.amd.com/system/files/styles/992px/private/2020-09/616656-amd-ryzen-5-5000-series-PIB-fan-1260x709.png?itok=m1h1cfYf",
	},
];

const Products = () => {
	const classes = useStyle();
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
							<Product product={product} />
						</Grid>
					);
				})}
			</Grid>
		</main>
	);
};

export default Products;

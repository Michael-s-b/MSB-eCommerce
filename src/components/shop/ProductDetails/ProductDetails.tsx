import { Grid, Paper, Typography, Button } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import useStyle from "./styles";
interface Props {}
const ProductDetails: React.FC<Props> = ({}) => {
	const { productId } = useParams();
	const classes = useStyle();

	return (
		<>
			<div className={classes.toolbar}></div>
			<div>ProductDetails{productId}</div>
			<div>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12}>
						<Paper className={classes.paper}>
							<img
								src="https://cdn.chec.io/merchants/50417/assets/RxA1lhX98NTjELBT|colorware-magic-keyboard-1.jpg"
								alt="Product Image"
								className={classes.image}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={12}>
						<Paper className={classes.paper}>
							<Typography variant="h4" gutterBottom>
								Product Name
							</Typography>
							<Typography
								variant="h5"
								className={classes.price}
								gutterBottom>
								$99.99
							</Typography>
							<Typography variant="body1" gutterBottom>
								Lorem ipsum dolor sit amet consectetur,
								adipisicing elit. Dolorem porro repudiandae
								unde. Laboriosam, rerum. Aliquam quaerat
								voluptatibus quod! Ipsam suscipit placeat
								obcaecati hic quod adipisci aliquam cupiditate
								iure iste architecto! Lorem, ipsum dolor sit
								amet consectetur adipisicing elit. Voluptate
								culpa, perspiciatis fuga fugiat, eius mollitia
								laudantium quae quasi quia deserunt quaerat
								repudiandae laboriosam corporis saepe neque sed
								beatae ipsum reprehenderit. Lorem ipsum dolor
								sit, amet consectetur adipisicing elit. Quaerat
								fugiat harum ipsum quam earum eius numquam esse
								sapiente dolore! Ipsam iure nulla aut amet
								voluptatum minus asperiores quae sed fugit.
							</Typography>
							<Button variant="contained" color="primary">
								Add to Cart
							</Button>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</>
	);
};

export default ProductDetails;

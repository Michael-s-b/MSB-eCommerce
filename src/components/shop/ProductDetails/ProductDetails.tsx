import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Loading from "../../layout/Loading/Loading";
import Carousel from "react-material-ui-carousel";
import useStyle from "./styles";
import { useAddToCart, useFetchProduct } from "../../../hooks";
import { string } from "zod";
interface Props {}
const ProductDetails: React.FC<Props> = ({}) => {
	const { productId } = useParams();
	const classes = useStyle();
	const addToCartMutation = useAddToCart();
	const handleAddToCart = async (productId: string, quantity: number) => {
		await addToCartMutation.mutateAsync({ productId, quantity });
	};

	const {
		data: product,
		isLoading: isProductLoading,
		isSuccess,
	} = useFetchProduct(productId);

	if (!product || isProductLoading) {
		if (!isSuccess && !isProductLoading) {
			return (
				<div>
					<br />
					<br />
					<br />
					<h1>Error 404 produto não encontrado</h1>
				</div>
			);
		}
		return <Loading />;
	}
	return (
		<>
			<div className={classes.toolbar}></div>
			<div>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
						<Carousel autoPlay={false}>
							{product.assets.map((asset) => {
								return (
									<Paper
										elevation={3}
										className={classes.imgPaper}
										key={asset.id}>
										<img
											src={asset.url}
											className={classes.image}
										/>
									</Paper>
								);
							})}
						</Carousel>
					</Grid>
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
						<Paper
							className={classes.descriptionPaper}
							elevation={3}>
							<Typography variant="h5" gutterBottom>
								{product.name}
							</Typography>
							<Typography
								variant="h5"
								className={classes.price}
								gutterBottom>
								{product.price.formatted_with_symbol}
							</Typography>
							<Typography
								dangerouslySetInnerHTML={{
									__html: product.description,
								}}
								variant="body2"
								color="textSecondary"
								gutterBottom></Typography>
							<Button
								onClick={() => {
									handleAddToCart(productId as string, 1);
								}}
								variant="contained"
								color="primary">
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

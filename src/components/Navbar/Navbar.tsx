import React from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Badge,
	MenuItem,
	Menu,
	Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/shopping-bag.png";
import useStyle from "./styles";
import { Link } from "react-router-dom";
interface Props {
	cartTotalItems: number | undefined;
}
const Navbar: React.FC<Props> = ({ cartTotalItems }) => {
	const classes = useStyle();
	return (
		<div>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Link
						to={"/"}
						style={{ textDecoration: "none", color: "inherit" }}>
						<Typography variant="h6" className={classes.image}>
							<img
								src={logo}
								alt="MSB e-Commerce"
								height={"25px"}
							/>
							{" MSB e-Commerce"}
						</Typography>
					</Link>

					<div className={classes.grow} />
					<div className={classes.button}>
						<Link to={"/cart"}>
							<IconButton
								aria-label="Show cart items"
								color="inherit">
								<Badge
									badgeContent={cartTotalItems}
									color="secondary"
									overlap="rectangular">
									<ShoppingCart color="action" />
								</Badge>
							</IconButton>
						</Link>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;

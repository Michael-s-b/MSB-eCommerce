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
import logo from "../../../assets/commerce.png";
import useStyle from "./styles";
import { Link, useLocation } from "react-router-dom";

interface Props {
	cartTotalItems: number | undefined;
}
const Navbar: React.FC<Props> = ({ cartTotalItems }) => {
	const classes = useStyle();
	const location = useLocation();
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
					{location.pathname !== "/cart" &&
					location.pathname !== "/checkout" ? (
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
					) : null}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;

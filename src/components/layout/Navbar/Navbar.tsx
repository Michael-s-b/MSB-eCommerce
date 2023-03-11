import React from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Badge,
	MenuItem,
	Menu,
	Typography,
	Button,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../../assets/commerce.png";
import useStyle from "./styles";
import { Link, useLocation } from "react-router-dom";
import { Brightness4Outlined } from "@material-ui/icons";

interface Props {
	cartTotalItems: number | undefined;
	toggleTheme: () => void;
}
const Navbar: React.FC<Props> = ({ cartTotalItems, toggleTheme }) => {
	const classes = useStyle();
	const location = useLocation();
	return (
		<div>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Link
						to={"/"}
						style={{ textDecoration: "none", color: "inherit" }}>
						<Typography
							variant="h6"
							className={classes.image}
							color="textPrimary">
							<img
								src={logo}
								alt="MSB e-Commerce"
								height={"25px"}
							/>
							{" MSB e-Commerce"}
						</Typography>
					</Link>

					<div className={classes.grow} />
					<IconButton
						onClick={() => {
							toggleTheme();
						}}>
						<Brightness4Outlined />
					</IconButton>
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

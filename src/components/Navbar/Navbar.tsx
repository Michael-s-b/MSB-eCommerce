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
const Navbar = () => {
	const classes = useStyle();
	return (
		<div>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Typography variant="h6" className={classes.image}>
						<img src={logo} alt="MSB e-Commerce" height={"25px"} />
						{" MSB e-Commerce"}
					</Typography>
					<div className={classes.grow} />
					<div className={classes.button}>
						<IconButton
							aria-label="Show cart items"
							color="inherit">
							<Badge
								badgeContent={2}
								color="secondary"
								overlap="rectangular">
								<ShoppingCart color="action" />
							</Badge>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;

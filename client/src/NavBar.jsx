import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';



export default class NavBar extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
		return (
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">Home</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							{this.props.currentUser ? (
								<React.Fragment>
									<NavItem>
										<NavLink href="/teams">Teams</NavLink>
									</NavItem>
									<NavItem>
										<NavLink href="/players">Players</NavLink>
									</NavItem>
									<NavItem>
										<NavLink href="/logout">Logout</NavLink>
									</NavItem>
								</React.Fragment>
							) : (
									<React.Fragment>
										<NavItem>
											<NavLink href="/login">Login</NavLink>
										</NavItem>
										<NavItem>
											<NavLink href="/signup">Sign up</NavLink>
										</NavItem>
									</React.Fragment>
								)
							}
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}
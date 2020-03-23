import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ icon, title }) => {
	return (
		<nav className="navbar bg-primary">
			<h1>
				<i className={icon} />
				{title}
			</h1>
		</nav>
	);
};

//Default Props can be overwritten
Navbar.defaultProps = {
	title: 'Github Finder',
	icon: 'fab fa-github'
};
//Checking the types of props passed basically typeChecking
Navbar.NavBarpropTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired
};

export default Navbar;

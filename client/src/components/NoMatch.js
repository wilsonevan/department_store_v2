import React from 'react';
import { Header, Button, } from 'semantic-ui-react';
import { Link, } from 'react-router-dom';

const NoMatch = () => (
	<div style={styles.container}>
		<Header as='h1' style={styles.header} >
			Oops!
		</Header>
		<Header as='h1' style={styles.header} >
			Nothing to see here.
		</Header>
		<Header as='h3'>
			Error - 404: You found a broken link...
		</Header>
		<Link to='/'>
			<Button basic color='black'>Home</Button>
		</Link>
		
	</div>
)

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '50px',
	},
	header: {
		fontSize: '50px',
	}
}

export default NoMatch;
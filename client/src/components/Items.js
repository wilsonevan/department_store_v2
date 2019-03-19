import React from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import { Header, Card, Button,  } from 'semantic-ui-react';

class Items extends React.Component {
	state = {
		department: this.props.department,
		items: [],
	}

	componentDidMount() {
		axios.get(`/api/v1/departments/${this.state.department}/items`)
			.then( res => {
				this.setState( { items: res.data } )
			})
	}

	renderitems() {
		const { department, items, } = this.state;

		if ( items.length <= 0 ) {
			return <Header as='h2'>No items Found</Header>
		} else {
			return items.map( item => (
				<Card>
					<Card.Content>
						<Card.Header>{ item.name }</Card.Header>
						<Card.Meta>{ item.price }</Card.Meta>
						<Card.Description>{ item.description }</Card.Description>
					</Card.Content>
					{/* <Card.Content extra>
						<Button as={Link} to={`/items/${item.id}`} color='blue' size='mini'>View</Button>
					</Card.Content> */}
				</Card>
			))
		}
		
	}

	render() {
		return (
			<div>
				<Header as='h1'>
					All items
				</Header>
				<Button as={Link} to='/items/new' color='blue'>
					Add Item
				</Button>
				<br />
				<br />
				<Card.Group>
					{ this.renderitems() }
				</Card.Group>
			</div>
		)
	}
}

export default Items;
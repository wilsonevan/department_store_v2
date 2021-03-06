import React from 'react';
import { Link, } from 'react-router-dom';
import { Header, Card, Button, Image,  } from 'semantic-ui-react';

const Items = ( { items }) => {
	return (
		<Card.Group>
			{ items.map( item => ( 
				<Card>
					<Card.Content>
						{/* Set Floats to 2 decimal places to accurately represent prices */}
						<Image floated='right'>${ item.price.toFixed(2) }</Image> 
						<Card.Header>{ item.name }</Card.Header>
						<Card.Description>{ item.description }</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<Button as={Link} to={`/departments/${item.department_id}/items/${item.id}`} color='blue' size='mini'>View</Button>
					</Card.Content>
				</Card>
			))}
		</Card.Group>
	)
}

export default Items;
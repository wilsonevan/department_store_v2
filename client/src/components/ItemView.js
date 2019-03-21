import React from 'react';
import { Card, Button, Image, Icon, } from 'semantic-ui-react';
import { Link, } from 'react-router-dom';
import axios from 'axios';


class ItemView extends React.Component {

	state = {
		name: "",
		description: "",
		price: undefined,
		// department_id: "",
	}

	componentDidMount() {
		// debugger
		const dept_id = this.props.match.params.department_id
		const item_id = this.props.match.params.id

		axios.get(`/api/v1/departments/${dept_id}/items/${item_id}`)
		.then( res => {
			this.setState( {...res.data} )
		})
	}

	deleteItem = (dept_id, id) => {
		axios.delete(`/api/v1/departments/${dept_id}/items/${id}`)
    .then( res => {
			this.props.history.push("/departments");
    })
	}
	

	render() {
		return (
			<Card>
				{/* <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' /> */}
				<Card.Content>
					<Image floated='right'>${ this.state.price }</Image> 
					<Card.Header>{this.state.name}</Card.Header>
					<Card.Description>{this.state.description}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<div className='ui two buttons'>
						<Button icon as={Link} to={`/departments/${this.state.department_id}/items/${this.state.id}/edit`}>
							<Icon name='pencil' />
						</Button>
						<Button icon color='red' onClick={() => this.deleteItem(this.state.department_id, this.state.id) }>
							<Icon name='trash' />
						</Button>
					</div>
				</Card.Content>
			</Card>
		)
	}
	
}

export default ItemView;
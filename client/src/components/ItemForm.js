import React from 'react';
import axios from 'axios';
import { Form, Header, } from 'semantic-ui-react';

class ItemForm extends React.Component {
	defaultState = {
		name: '',
		description: '',
		price: undefined,
	}
	
	state = { ...this.defaultState };
	
	// DOES NOT WORK -- Attempt to show current name in the text-field when updating names
	componentDidMount() {
		const dept_id = this.props.match.params.department_id;
		const id = this.props.match.params.id;
		// let currentItem = this.state
		
		if (id > 0) {
			axios.get(`/api/v1/departments/${dept_id}/items/${id}`)
			.then( res => {
				// currentItem = res.data;
				this.setState( { ...res.data } ) // This works!
			})
			// this.setState( { ...currentItem } ) //DOES NOT WORK FOR SOME REASON

		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const item = { ...this.state, };
		const dept_id = this.props.match.params.department_id
		const id = this.props.match.params.id

		if (this.props.match.params.id) { // If ID is PRESENT, then must be an EDIT function
			axios.put(`/api/v1/departments/${dept_id}/items/${id}`, item )
			.then( res => {
				this.props.history.push(`/departments/${dept_id}/items/${id}`);
			})
		}
		else { // If no ID present, then must be an ADD function
			axios.post(`/api/v1/departments/${dept_id}/items`, item )
			.then( res => {
				this.props.history.push('/departments');
			})
		}

		// Reset state back to blank default state
		this.setState( {...this.defaultState, } )
	}

	handleChange = (e) => {
		const { target: { name, value } } = e;
		this.setState( { [name]: value } );
	}

	render() {
		const { name, description, price, } = this.state
		const id = this.props.match.params.id

		return (
			<div>
				{this.props.match.params.id ? 
					<Header as='h1'>Edit Item</Header>
				:
					<Header as='h1'>New Item</Header>
				}
				<Form>
					<Form.Group widths='equal'>
						<Form.Input 
							label='Name'
							placeholder={ id ? name : 'Name' }
							// placeholder='Name'
							name='name'
							required
							onChange={ this.handleChange }
							value={ name }
						/>
						<Form.Input 
							label='Description'
							placeholder={ id ? description : 'Description' }
							// placeholder='Name'
							name='description'
							required
							onChange={ this.handleChange }
							value={ description }
						/>
						<Form.Input 
							label='Price'
							placeholder={ id ? price : 'Price' }
							// placeholder='Name'
							name='price'
							required
							onChange={ this.handleChange }
							value={ price }
						/>
					</Form.Group>
					<Form.Button onClick={ this.handleSubmit }>Submit</Form.Button>
				</Form>
			</div>
		)
	}
}

export default ItemForm;
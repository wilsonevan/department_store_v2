import React from 'react';
import axios from 'axios';
import { Form, Header, } from 'semantic-ui-react';

class DepartmentForm extends React.Component {
	defaultState = {
		name: '',
	}
	
	state = { ...this.defaultState };
	
	// DOES NOT WORK -- Attempt to show current name in the text-field when updating names
	componentWillMount() {
		let id = this.props.match.params.id;
		let currentName = '';
		
		if (id > 0) {
			axios.get(`/api/v1/departments/${id}`)
			.then( res => {
				currentName = res.data.name;
			})
			this.setState( { name: currentName } )
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const department = { ...this.state, };
		if (this.props.match.params.id) { // If ID is PRESENT, then must be an edit function
			axios.put(`/api/v1/departments/${this.props.match.params.id}`, department )
			.then( res => {
				this.props.history.push('/departments');
			})
		} 	
		else { // If no ID present, then must be an ADD function
			axios.post('/api/v1/departments', department )
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
		const { name, } = this.state

		// debugger
		return (
			<div>
				{this.props.match.params.id ? 
					<Header as='h1'>Edit Department</Header>
				:
					<Header as='h1'>New Department</Header>
				}
				<Form>
					{/* <Form.Group widths='equal'> */}
						<Form.Input 
							label='Name'
							placeholder={ this.props.match.params.id ? this.state.name : 'Name' }
							// placeholder='Name'
							name='name'
							required
							onChange={ this.handleChange }
							value={ name }
						/>
					{/* </Form.Group> */}
					<Form.Button onClick={ this.handleSubmit }>Submit</Form.Button>
				</Form>
			</div>
		)
	}
}

export default DepartmentForm;
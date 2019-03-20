import React from 'react';
import axios from 'axios';
import { Form, Header, } from 'semantic-ui-react';

class DepartmentForm extends React.Component {
	defaultState = {
		name: '',
	}
	
	state = { ...this.defaultState };

	handleSubmit = (e) => {
		e.preventDefault();
		const department = { ...this.state, };

		// TODO make an API post request
		axios.post('/api/v1/departments', department )
			.then( res => {
				this.props.history.push('/departments');
			})
		// Reset state back to blank default state
		this.setState( {...this.defaultState, } )
	}

	handleChange = (e) => {
		const { target: { name, value } } = e;
		this.setState( { [name]: value } );
	}

	render() {
		const { name, } = this.state

		return (
			<div>
				<Header as='h1'>New Department</Header>
				<Form>
					{/* <Form.Group widths='equal'> */}
						<Form.Input 
							label='Name'
							placeholder='Name'
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
import React from 'react';
import { Header, Container, Grid, Menu, Segment, Icon, Button, } from 'semantic-ui-react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import Items from './Items';
import DepartmentForm from './DepartmentForm';

class Departments extends React.Component {
	state = { 
		activeDepartmentId: undefined,
		activeDepartment: '',
		departments: [],
		items: [],
	}

	// Initialize the page to view the first item in the array of departments
	componentDidMount() {
		axios.get('/api/v1/departments')
			.then( res => {
				const activeID = res.data[0].id
				const activeName = res.data[0].name
				this.setState( { departments: res.data, activeDepartmentId: activeID, } )

				// Execute the click function
				this.handleDeptClick(activeID, activeName, )
			})
	}
	
  updateDept = (id, newData) => {
		axios.put(`/api/v1/departments/${id}`, {departments: {name: newData}, }, )
			.then( res => {
				const department = this.state.departments.map( t => {
					if (t.id === id)
						return res.data;
					return t;
				})
			})
			.catch( err => {
				console.log(err);
			})
  }


  deleteDept = (id) => {
		axios.delete(`/api/v1/departments/${id}`)
    .then( res => {
			const { departments, } = this.state;
      this.setState({ departments: departments.filter(d => d.id !== id), })
    })
  }


	handleDeptClick = (id, name ) => {
		this.setState({ activeDepartmentId: id, activeDepartment: name })

		// Update State with items
		axios.get(`/api/v1/departments/${id}/items`)
			.then( res => {
				this.setState( { items: res.data, } )
			})

	}


	renderItems() {
		const { items, activeDepartment, activeDepartmentId, } = this.state;

		if ( items.length <= 0 ) {
			return (
				<div>
					<Header attached as='h2'>No items Found</Header>
					<Segment attached>
						<Items items={ items }/>
					</Segment>
				</div>
			)
		} else {
			return (
				<div>
					<Header attached>
						<Header as='h2' floated='left' >{activeDepartment}</Header>
						<Button.Group floated='right' compact size='small' style={ styles.twoButtons } >
							<Button icon as={Link} to={`/departments/${activeDepartmentId}/edit`}>
								<Icon name='pencil' />
							</Button>
							<Button icon color='red' onClick={() => this.deleteDept(activeDepartmentId) }>
								<Icon name='trash' />
							</Button>
						</Button.Group>
						<br />
						<br />
					</Header>
					<Segment attached >
						<Items items={ items }/>
					</Segment>
				</div>
			)
		}
	}


	renderDepartments() {
		const { departments, activeDepartmentId, } = this.state;

		if ( departments.length <= 0 ) {
			return <Header as='h2'>No Departments Found</Header>
		} 
		else {
			return (
				<Segment inverted color='grey' tertiary>
				<Grid>
					<Grid.Column width={5}>
						<Menu inverted color='grey' fluid vertical tabular>
							{departments.map( department => (
								<Menu.Item name={department.name} active={activeDepartmentId === department.id } onClick={() => this.handleDeptClick(department.id, department.name)}>
									{ department.name }
								</Menu.Item>
							))}
						</Menu>
					</Grid.Column>

					<Grid.Column stretched width={11}>
						{ this.renderItems() }
					</Grid.Column>
				</Grid>
				</Segment>
			)
		}
	}


	render() {
		return (
			<Container>
				<Header as='h1'>All Departments</Header>
				<Button as={Link} to='/departments/new' color='blue' compact >
					Create New Department
				</Button>
				<br />
				<br />
				{ this.renderDepartments() }
			</Container>
		)
	}
}

const styles = { 
 	twoButtons: { 
		marginTop: '0px !important',
		paddingTop: '0px !important',
	}
}

export default Departments;
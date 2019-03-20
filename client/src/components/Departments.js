import React from 'react';
import { Header, Container, Grid, Menu, Segment, Icon, Button, } from 'semantic-ui-react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import Items from './Items';
import DepartmentForm from './DepartmentForm';

class Departments extends React.Component {
	state = { 
		activeItem: 1,
		departments: [],
		items: [],
	}


	componentDidMount() {
		axios.get('/api/v1/departments')
			.then( res => {
				this.setState( { departments: res.data } )
			})

		// Default to first item in the list
		this.handleDeptClick(this.state.activeItem)
	}


  updateDept = (id, newData) => {
		axios.put(`/api/v1/departments/${id}`, {departments: {name: newData}, }, )
			.then( res => {
				// debugger
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


	handleDeptClick = (id) => {
		this.setState({ activeItem: id })

		// Update State with items
		axios.get(`/api/v1/departments/${id}/items`)
			.then( res => {
				this.setState( { items: res.data } )
			})
	}


	renderItems() {
		const { items, } = this.state;

		if ( items.length <= 0 ) {
			return <Header as='h2'>No items Found</Header>
		} else {
			return <Items items={ items }/>
		}
	}
	

	renderDepartments() {
		const { departments, activeItem, items, } = this.state;

		if ( departments.length <= 0 ) {
			return <Header as='h2'>No Departments Found</Header>
		} 
		else {
			return (
				<Grid>
					<Grid.Column width={6}>
						{departments.map( department => (
								<Menu fluid vertical tabular>
									<Menu.Item name={department.name} active={activeItem === department.id } onClick={() => this.handleDeptClick(department.id)}>
										{ department.name }
										<Button.Group floated='right' compact size='small' style={ styles.twoButtons } >
											<Button icon as={Link} to={`/departments/${department.id}/edit`}>
												<Icon name='pencil' />
											</Button>
											<Button icon color='red' onClick={() => this.deleteDept(department.id) }>
												<Icon name='trash' />
											</Button>
										</Button.Group>
										{/* onClick={() => this.handleEditClick(department.id)} */}
									</Menu.Item>
								</Menu>
							))
						}
					</Grid.Column>

					<Grid.Column stretched width={10}>
						<Segment>
							{ this.renderItems() }
						</Segment>
					</Grid.Column>
				</Grid>
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
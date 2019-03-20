import React from 'react';
import { Header, Container, Grid, Menu, Segment, Icon, Button, } from 'semantic-ui-react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import Items from './Items';

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


	addDept = (name) => {
    // TODO make api call to rails server to add item
    // TODO update state
	}
	

  updateDept = (id, newData) => {
    // TODO make api call to update todo
		axios.put(`/api/v1/departments/${id}`, {department: {name: newData}, }, )
			.then( res => {
				// debugger
				const department = this.state.department.map( t => {
					if (t.id === id)
						return res.data;
					return t;
				})
			})
			.catch( err => {
				console.log(err);
				// debugger
			})

		// TODO update state
    // this.setState({ department, });
  }


  deleteDept = (id) => {
    // TODO make api call to delete todo
		// TODO remove it from state
		axios.delete(`/api/items/${id}`)
    .then( res => {
      const { department, } = this.state;
      this.setState({ department: department.filter(d => d.id !== id), })
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

	handleEditClick = (id) => {
		

		let departmentName = this.state.departments[id].name;
		
		return
		debugger
		
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
					<Grid.Column width={4}>
						{departments.map( department => (
								<Menu fluid vertical tabular>
									<Menu.Item name={department.name} active={activeItem === department.id } onClick={() => this.handleDeptClick(department.id)}>
										{ department.name }
										<Icon name='pencil square' size='small' onClick={() => this.handleEditClick(department.id)} />
									</Menu.Item>
								</Menu>
							))
						}
					</Grid.Column>

					<Grid.Column stretched width={12}>
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
				{/* <Button color='grey' compact >Edit Existing Department</Button> */}
				<br />
				<br />
				{ this.renderDepartments() }
			</Container>
		)
	}
}

export default Departments;
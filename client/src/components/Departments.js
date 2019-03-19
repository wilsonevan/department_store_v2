import React from 'react';
import { Header, Container, Grid, Menu, Segment, Card, Button,  } from 'semantic-ui-react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
// import Items from './Items';

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

		this.handleDeptClick(1)
	}


	handleDeptClick = (id) => {
		this.setState({ activeItem: id })

		axios.get(`/api/v1/departments/${id}/items`)
			.then( res => {
				this.setState( { items: res.data } )
			})

		// debugger

		// this.renderDepartments()
	}


	renderitems() {
		const { items, } = this.state;

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
	

	renderDepartments() {
		const { departments, activeItem, items, } = this.state;
		// const { activeItem } = this.state.activeItem

		if ( departments.length <= 0 ) {
			return <Header as='h2'>No Departments Found</Header>
		} 
		else {
			// debugger
			return (
				<Grid>
					<Grid.Column width={4}>
						{departments.map( department => (
								<Menu fluid vertical tabular>
									<Menu.Item name={department.name} active={activeItem === department.id } onClick={() => this.handleDeptClick(department.id)} />
								</Menu>
							))
						}
					</Grid.Column>

					<Grid.Column stretched width={12}>
						<Segment>
							{/* <Header as='h1'>
								
							</Header> */}
							{/* <Button as={Link} to='/items/new' color='blue'>
								Add Item
							</Button> */}
							{/* <br />
							<br /> */}
							<Card.Group>
								{ this.renderitems() }
							</Card.Group>
						</Segment>
					</Grid.Column>
				</Grid>
			)
		}
	}

	render() {
		// const { activeItem } = this.state.activeItem

		return (
			<Container>
				<Header as='h1'>All Departments</Header>
				{ this.renderDepartments() }
			</Container>
		)
	}
}

export default Departments;
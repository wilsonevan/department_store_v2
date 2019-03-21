// Import Components
import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, } from 'semantic-ui-react';

// Import Routes
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoMatch from './components/NoMatch';
import Departments from './components/Departments';
import DepartmentForm from './components/DepartmentForm';
import ItemView from './components/ItemView';
import ItemForm from './components/ItemForm';


class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Container>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/departments' component={Departments} />
            <Route exact path='/departments/new' component={DepartmentForm} />
            <Route exact path='/departments/:id/edit' component={DepartmentForm} />
            <Route exact path='/departments/:department_id/items/:id' component={ItemView} />
            <Route exact path='/departments/:department_id/items/:id/edit' component={ItemForm} />
            <Route exact path='/departments/:department_id/items/new' component={ItemForm} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </Fragment>
    );
  }
}

export default App;

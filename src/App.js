import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';
import About from './components/pages/About'

class App extends Component {
	state = {
		users: [],
		loading: false,
		alert: null
	};

	//Search Github Users
	searchUsers = async (text) => {
		this.setState({
			loading: true
		});
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({
			users: res.data.items,
			loading: false
		});
	};

	//Clear Users from state
	clearUsers = () => this.setState({ users: [], loading: false });

	//Alerting the user when search is blank

	setAlert = (msg, type) => {
		this.setState({
			alert: {
				msg: msg,
				type: type
			}
		});

		setTimeout(() => this.setState({ alert: null }), 3000);
	};

	render() {
		const { users, loading } = this.state;

		return (
      <Router>
			<div className="App">
				<Navbar />
				<div className="container">
          <Alert alert={this.state.alert} />
          <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
            <Search
						searchUsers={this.searchUsers}
						clearUsers={this.clearUsers}
						showClear={users.length > 0 ? true : false}
						setAlert={this.setAlert}
					/>
            </Fragment>
            )
          }/>
          <Route exact path="/about" component={About}/>
          </Switch>

					<Users loading={loading} users={users} />
				</div>
      </div>
      </Router>
		);
	}
}

export default App;

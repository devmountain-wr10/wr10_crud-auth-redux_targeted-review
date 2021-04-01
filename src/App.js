import { Component } from 'react';
import './App.scss';
import Header from './Components/Header/Header';
import routes from './routes';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from './redux/reducers/userReducer';

class App extends Component {
  componentDidMount() {
     // comment out componentDidMount and see what happens when you refresh the page for a logged in user. you lose all the redux state for the user! so we need to grab it again from the back end to repopulate our redux state
     // because every component is a child of App in one way or another, we can guarantee that if they refresh while viewing any component that App.js componentDidMount will fire
    axios
      .get('/auth/session')
      .then(res => {
        this.props.updateUser(res.data)
      })
  }

  render() {
    return (
      <div className="site-container">
        <Header />
        <main className='main-view'>
          { routes }
        </main>
      </div>
    );
  }
}

export default connect(null, { updateUser })(App);
import { Component } from 'react';
import AddJoke from './AddJoke';
import JokeItem from './JokeItem';
import './JokesList.scss';
import { connect } from 'react-redux';
import { updateJokes } from '../../redux/reducers/jokesReducer';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// CHALLENGE:
// after a user searches, can you make a 'clear search' button functionality?

class JokesList extends Component {
    constructor() {
        super();
        this.state = {
            search: ''
        }
    }

    componentDidMount() {
        this.getJokes();
    }

    getJokes = () => {
        // using this function in componentDidMount and passing down to children so they can refresh the jokes list if a joke is added/edited/deleted
        axios
            .get(`/api/jokes`)
            .then(res => {
                this.props.updateJokes(res.data)
            })
    }

    searchJokes = () => {
        if (!this.state.search) {
            this.getJokes(); // if click search but no search word, just return all jokes
        } else {
            axios
                .get(`/api/jokes?search=${this.state.search}`)
                .then(res => {
                    this.props.updateJokes(res.data)

                    this.setState({ //clear the search so our if statement at the beginning of this function works if the user double clicks 'search'
                        search: ''
                    })
                })
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    render() {
        const jokesMapped = this.props.jokesReducer.jokes.map((jokeObj, i) => <JokeItem key={i} jokeObj={jokeObj} getJokes={this.getJokes} />)

        // we'll include this so only users can see jokes
        if (!this.props.userReducer.user) {
            return <Redirect to='/' />
        }

        return (
            <section className='jokes-list'>
                <AddJoke getJokes={this.getJokes} />

                <div className='search-jokes'>
                    <input name='search' placeholder='search jokes' onChange={this.handleChange} className='search-input' value={this.state.search} />
                    <button className='search-submit' onClick={this.searchJokes}>search</button>
                </div>

                { jokesMapped }
            </section>
        )
    }
}

const mapStateToProps = reduxState => {
    return reduxState
}

export default connect(mapStateToProps, { updateJokes })(JokesList);
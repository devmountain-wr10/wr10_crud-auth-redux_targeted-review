import { Component } from 'react';
import './JokeItem.scss';
import { connect } from 'react-redux';
import axios from 'axios';

class JokeItem extends Component {
    constructor() {
        super();
        this.state = {
            editMode: false,
            updatedJoke: ''
        }
    }

    handleChange = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })
    }

    editJokeMode = () => {
        this.setState({ 
            editMode: true
        })
    }

    handleEditJokeSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`/api/jokes/${this.props.jokeObj.joke_id}`, { updated_joke: this.state.updatedJoke})
            .then(() => {
                this.setState({
                    editMode: false,
                    updatedJoke: ''
                })

                this.props.getJokes();
            })
    }

    cancelEditJoke = () => {
        const { editMode, updatedJoke } = this.state;

        this.setState({
            editMode: false,
            updatedJoke: ''
        })
    }

    deleteJoke = () => {
        axios
            .delete(`/api/jokes/${this.props.jokeObj.joke_id}`)
            .then(() => {
                this.props.getJokes();
            })
    }

    render() {
        const { jokeObj } = this.props;
        const { editMode, updatedJoke } = this.state;

        console.log(jokeObj.joke_id)
        console.log(this.props.userReducer.user.silly_joke_user_id)

        return (
            <div className='joke-item' >
                <div className='jokes-list-joke'>
                    <p>{jokeObj.joke_text}</p>
                    <div>
                        {
                            editMode ? (
                                <button onClick={this.cancelEditJoke}>cancel</button>
                            ) : (
                                <>
                                {
                                    // users should only be able to edit/delete the joke if it was posted by them
                                    jokeObj.user_id === this.props.userReducer.user.silly_joke_user_id ? (
                                            <>
                                            <button onClick={this.editJokeMode}>edit</button>
                                            <button onClick={this.deleteJoke}>X</button>
                                            </>

                                        ) : null
                                    }
                                    </>
                            )
                        }
                    </div>
                </div>
                {
                    editMode ? (
                        <>
                            <form onSubmit={this.handleEditJokeSubmit} className='jokes-list-edit-joke'>
                                <input name='updatedJoke' onChange={this.handleChange} value={updatedJoke} />

                                <button type='submit'>submit</button>
                            </form>
                            
                        </>
                    ) : null
                }
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return reduxState;
}

export default connect(mapStateToProps)(JokeItem);
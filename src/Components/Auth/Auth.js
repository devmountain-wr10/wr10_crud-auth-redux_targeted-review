import { Component } from 'react';
import axios from 'axios';
import './Auth.scss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/reducers/userReducer';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            mode: 'register',
            email: '',
            password: ''
        }
    }

    handleMode = e => {
        this.setState({ mode: e.target.name })
    }

    handleInput = e => {
        const { name, value } = e.target;

        this.setState({ [name]: value})
    }

    handleSubmit = () => {
        const { mode, email, password } = this.state;

        const path = mode === 'register' ? 'register' : 'login';

        axios
            .post(`/auth/${path}`, { email, password })
            .then(res => {
                this.props.updateUser(res.data);
                this.props.history.push('/jokes');
            })
            .catch(err => {
                console.log(err);
                window.alert(err.response.data)
            });
    }

    render() {
        const { mode } = this.state;

        // we'll include this so if a user refreshes the page on another view then they are pushed to JokesList.js
        if (this.props.userReducer.user) {
            return <Redirect to='/jokes' />
        }

        return (
            <section className='Auth'>
                <div className='auth-choice'>
                    <button name='register' onClick={this.handleMode} disabled={mode === 'register'}>Register</button>
                    <button name='sign in' onClick={this.handleMode} disabled={mode === 'sign in'}>Sign In</button>
                </div>
                <h1>{mode.toUpperCase()}</h1>

                <div>
                    <input placeholder='email' name='email' onChange={this.handleInput} />
                    <input placeholder='password' name='password' onChange={this.handleInput} type='password' />
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
                
            </section>
        )
    }
}

const mapStateToProps = reduxState => {
    return reduxState;
}

export default connect(mapStateToProps, { updateUser })(Auth);
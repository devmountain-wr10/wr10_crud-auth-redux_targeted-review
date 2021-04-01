import './Header.scss';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/reducers/userReducer';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function Header(props) {
    const handleLogout = () => {
        axios
            .delete('/auth/logout')
            .then(() => {
                props.logoutUser(); // important to clear out the redux user data. logging out on the back end does not automatically do this on the front end
                props.history.push('/');
            })
    }

    return (
        <header className='site-header'>
            <h2 className='site-title'>Silly Jokes by Sillier People</h2>
            <p>Welcome {props.user ? props.user.email : 'Guest'}</p>
            {/* we'll update so only logged in users see the logged in button */}
            <div className={props.user ? null : 'logged-out'}> 
                <button onClick={handleLogout}>Logout</button>
            </div>
        </header>
    )
}

const mapStateToProps = reduxState => {
    return reduxState.userReducer;
}

export default withRouter(connect(mapStateToProps, { logoutUser })(Header));
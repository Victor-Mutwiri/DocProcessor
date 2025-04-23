import PropTypes from 'prop-types'
import './FeaturesNav.css'
import DarkModeToggle from '../common/DarkModeToggle';
import Logout from '../Logout/Logout';
import {NavLink} from 'react-router-dom';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FaUser } from 'react-icons/fa';
import Admin from '../../screens/Admin/Admin'

const FeaturesNav = ({onLogout}) => {
    return (
        <nav className="features-nav">
            <ul>
                <li>
                    <NavLink to="/main" activeClassName="active">
                        Chat
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contract-review" activeClassName="active">
                        Contract Reviews
                    </NavLink>
                </li>
            </ul>
            <div className="features-nav__right">
                <DarkModeToggle />
                {/* <Logout onLogout={onLogout}/> */}
                <NavLink to="/profile" activeClassName="active" className="profile-link">
                    <FaUser className="admin-icon" />
                    Profile
                </NavLink>
            </div>
        </nav>
    );
    };

FeaturesNav.propTypes = {
    sessionId: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired
}

export default FeaturesNav;
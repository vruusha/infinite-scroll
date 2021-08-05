import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '../../images/menu.svg';


const propTypes = {
    menuItems: PropTypes.array
}
class Navigation extends React.Component {

    render() {
        return (
            <nav className="nav">
                <div className="menu">
                    <img className="icon-menu" src={MenuIcon} alt="menu" role="image"/>
                    <a>Messages</a>
                </div>
            </nav>

            
        )
    }

}

Navigation.propTypes = propTypes;

export {Navigation};


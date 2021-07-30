import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '../../images/menu.svg';


const propTypes = {
    menuItems: PropTypes.array
}
class Navigation extends React.Component {

    render() {
        return (
            <div className="nav">
                <div className="menu">
                    <img className="icon-menu" src={MenuIcon} alt="menu" />
                    <a>Messages</a>
                </div>
            </div>

            
        )
    }

}

Navigation.propTypes = propTypes;

export {Navigation};


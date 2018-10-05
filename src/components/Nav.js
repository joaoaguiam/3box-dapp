import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './styles/Nav.css';
import ThreeBoxLogo from './ThreeBoxLogo.jsx';
import * as routes from '../utils/routes';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfileModal: false,
    };
  }

  handleDropdown = () => {
    const { showProfileModal } = this.state;
    this.setState({
      showProfileModal: !showProfileModal,
    });
  }

  render() {
    const { showProfileModal } = this.state;
    const { image, threeBox, location } = this.props;
    const { pathname } = location;
    return (
      <div>
        {pathname !== '/' &&
          <nav>
            <ThreeBoxLogo />
            {
              image.length > 0 ?
                <img src={`https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`} id="header_user_picture" alt="profile" onClick={this.handleDropdown} role="button" />
                : <div id="header_user_picture" onClick={this.handleDropdown} />
            }

            {showProfileModal
              && (
                <li id="dropdown" onMouseLeave={this.handleDropdown} onClick={this.handleDropdown}>
                  <ul>
                    <Link to={routes.PROFILE}><li>Profile</li></Link>
                    <Link to={routes.EDITPROFILE}><li>Edit profile</li></Link>
                    <div className="divide" />
                    <Link to={routes.LANDING} onClick={() => threeBox.logOut()}><li>Sign Out</li></Link>
                    <div id="divideBug" />
                    <a href="https://airtable.com/shrX4fI8MDuaPpef9"><li id="reportBug">Report a bug</li></a>
                  </ul>
                </li>
              )
            }
          </nav>
        }
      </div>
    );
  }
}

Nav.propTypes = {
  image: PropTypes.array,
  threeBox: PropTypes.object,
};

Nav.defaultProps = {
  image: [],
  threeBox: {},
};

function mapState(state) {
  return {
    image: state.threeBox.image,
    threeBox: state.threeBox.box,
  };
}

export default withRouter(connect(mapState)(Nav));

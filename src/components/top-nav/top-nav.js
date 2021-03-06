import React from 'react';
import { connect } from 'react-redux';
import './top-nav.css'

import { goHome, goCreate, fetchClouds} from '../../actions/actions';

export function TopNav(props) {

    return (
      <div className="nav-container">
        <div className="nav-flex-1">
            <div className="header-text-div">
                <div className="header-text-inner">
                    <div className="header-icon">
                        <a className="header-icon-clickable" onClick={() => props.dispatch(goHome())}>
                            <span className="fas fa-cloud header-icon-1"></span>
                            <span className="fas fa-cloud header-icon-2"></span>
                        </a>
                    </div>
                    <a className="header-title-clickable" onClick={() => props.dispatch(goHome())}>
                        <h1>React Cloud Generator</h1>
                    </a>
                </div>
                <span className="header-span">a word cloud generator built with React.js</span>
            </div>
        </div>
        <div className="nav-flex-2">
            <nav>
                <ul className="nav">
                    <li className="nav-items">
                        <a className="home" onClick={() => props.dispatch(goHome())}>
                            Home
                        </a>
                    </li>
                    <span className="nav-divider">|</span>
                    <li className="nav-items">
                        <a className="create" onClick={() => props.dispatch(goCreate())}>
                            Create
                        </a>
                    </li>
                    <span className="nav-divider">|</span>
                    <li className="nav-items">
                        <a className="library" onClick={() => props.dispatch(fetchClouds())}>
                            Library
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  );
}

const mapStateToProps = state => ({
    view: state.view
  });  

export default connect(mapStateToProps) (TopNav);
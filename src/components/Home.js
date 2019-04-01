import React, { Component, Fragment } from 'react';
import NavBar from './misc/NavBar';

import { withAuthConsumer } from '../context/AuthStore';



class Home extends Component {
    render(){
        return(
            <Fragment>
                <NavBar /> 
                            
            </Fragment>
        );
    }
}

export default withAuthConsumer(Home);


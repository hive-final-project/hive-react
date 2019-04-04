import '../styles/home.css';

import React, { Component } from 'react';
import NavBar from './misc/NavBar';
import { pics } from '../utils/imgProvider';

import { withAuthConsumer } from '../context/AuthStore';
import MenuUser from '../components/ui/MenuUser';
import authService from '../services/auth-service';
import MenuProducer from './ui/MenuProducer';


class Home extends Component {

    state= {
        user:{}
    }

    componentDidMount() {
        authService.getUser()
          .then(
              (user) => this.setState({ user: {...this.state.user, ...user} }),
              (error) => console.error(error)
            )
    }

    isProducer = () => this.state.user.role === 'PRODUCER';
  
    isUser = () => this.state.user.role === 'USER';

    render(){
        return(
            <div className="home-div">
                <NavBar /> 
                <div>
                    <img className="logo-image" alt="logo" src={pics.logo} />
                    <div className="intro-div">   
                    </div>
                </div> 
                { this.isUser() && <MenuUser />}
                { this.isProducer() && <MenuProducer />}             
            </div>
        );
    }
}

export default withAuthConsumer(Home);

 
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';

//export default class Signup extends React.Component {
export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //allows the default prop to be set to a value (let parent pass in a value) or set to zero by default
      //count: this.props.count || 0
      error: ''
    };
  }
  
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 9) {
      return this.setState({ error: 'Password must be more than 8 characters long'})
    }
    //Long versions
    //  Accounts.createUser({ email: '', password: ''}, (err) => {
    //  Accounts.createUser({ email: email, password: password}, (err) => {
    //es6 version - preferred syntax
    this.props.createUser({ email, password }, (err) => {
      console.log('Signup callback', err);
      if (err) {
        //error exists, update error state
        this.setState({ error: err.reason });
      } else {
        //no error - clear state
        // clean up current state by setting error to empty string
        this.setState({ error: '' });
      }
    });

   // this.setState({
    //  error: 'Something went wrong.'
   // });2
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={ this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Create Accoount</button>
          </form>

          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  creatUser: PropTypes.func.isRequired
};


export default createContainer( () => {
  return {
    createUser: Accounts.createUser
  };
}, Signup);
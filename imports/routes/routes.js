import  { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

//pages you can visit if NOT authenticated
const unauthenticatedPages = ['/', '/signup'];

//pages you can visit if authenticated
const authenticatedPages = ['/dashboard'];

//function to handle user clicking Back button
//  logged in and hitting Back to go to public page
const onEnterPublicPage = () => {
    //check if userId is null (not logged in)
    if(Meteor.userId()) {
        browserHistory.replace('/dashboard');
    }
};

//function to handle user clicking Back button
//  not logged in and hitting Back to go to private page
const onEnterPrivatePage = () => {
  //check if user is not logged in
  if(!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

//Checks authentication/page combination
//  must be logged in to be on private pages
//  is logged in should not be on some public pages
export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    //if on unathenticated page and logged in, redirect to /links
    //if on authenticated page and NOT logged in, redirect to /
    if (isUnauthenticatedPage && isAuthenticated) {
        browserHistory.replace('/dashboard');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        browserHistory.replace('/');
    }

    console.log('isAuthenticated: ', isAuthenticated);
}

//routes complete ith onEnter attribute to prevent hitting back button onto private page
export const routes = (
    <Router history={ browserHistory }>
        <Route path='/' component={ Login } onEnter={ onEnterPublicPage }/>
        <Route path='/signup' component={ Signup } onEnter={ onEnterPublicPage }/>
        <Route path='/dashboard' component={ Dashboard } onEnter={ onEnterPrivatePage }/>
        <Route path='*' component={ NotFound } />
    </Router>
);

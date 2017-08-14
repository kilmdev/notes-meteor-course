
import  { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

//use Tracker.autorun to track the users authentication status
Tracker.autorun( () => {
  //if empty/null, then not logged in, otherwse holds a non-empty string value
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});




Meteor.startup( () => { 
  ReactDOM.render(routes, document.getElementById('app'));
});
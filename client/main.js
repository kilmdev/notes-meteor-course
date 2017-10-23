
import  { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

//use Tracker.autorun to track the users authentication status
Tracker.autorun( () => {
  //if empty/null, then not logged in, otherwise holds a non-empty string value
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Tracker.autorun( () => {
//watch for a change in selected noteId and when it
//  does change, update the url

  const selectedNoteId = Session.get('selectedNoteId');

  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }

});


Meteor.startup( () => { 
  Session.set('selectedNoteId', undefined);
  ReactDOM.render(routes, document.getElementById('app'));
});
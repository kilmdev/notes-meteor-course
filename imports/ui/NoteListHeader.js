import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';

export const NoteListHeader = (props) => {
    return (
        <div>
            <button onClick={ ()=> { props.meteorCall('notes.insert'); } }>Create Note</button>
        </div>
    );
};

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired
}

export default createContainer(() => {
    return {
        meteorCall: Meteor.call
    };
}, NoteListHeader);
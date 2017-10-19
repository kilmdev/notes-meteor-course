import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';


export const NoteList = (props) => {
    return (
        <div>
            <NoteListHeader/>
            { props.notes.length === 0 ? <NoteListEmptyItem/>: undefined}
            {props.notes.map( (note) => {
                return <NoteListItem key={ note._id } note={ note }/>;
            })}
            
            NoteList { props.notes.length }
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
};

export default createContainer(() => {
    //subscribe to the publication setup in api/notes.js
    Meteor.subscribe('notes');

    //fetch notes from the database
    //  return an object
    //keys in here become props on the component
    return {
        //prop = list of all notes available for user to edit
        notes: Notes.find().fetch()
    };

}, NoteList);
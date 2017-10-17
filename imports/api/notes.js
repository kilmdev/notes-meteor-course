import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

//create collection
export const Notes = new Mongo.Collection('notes');

//create new publication
if(Meteor.isServer) {
    //es5 to use this keyword
    Meteor.publish('notes', function() {
        //return the notes associated with the currently logged
        // in user
        return Notes.find({ userId: this.userId });
    });
}

Meteor.methods({
    'notes.insert'() {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        return Notes.insert({
            title: '',
            body: '',
            userId: this.userId,
            //updatedAt: new Date().getTime() //non-moment version
            updatedAt: moment().valueOf()

        })
    },
    'notes.remove'(_id) {
        // Check for user id
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        //Use simple schema to validate _id is string with length >1
        new SimpleSchema({
            _id: {
              type: String,
              min: 1
            }
          }).validate({ _id });
          
          Notes.remove({ _id, userId: this.userId });
    },
    'notes.update'(_id, updates) {
        // Check for user id
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        //Use simple schema to validate _id is string with length >1
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            title: {
                type: String,
                optional: true
            },
            body: {
                type: String,
                optional: true
            }
        }).validate({ 
            _id,
            ...updates 
        });

        //checks both the _id and the userId to make sure the user
        //  updating is the user that created the note
        Notes.update({
            _id, 
            userId: this.userId
        }, {
            $set: {
                updatedAt: moment().valueOf(),
                ...updates
            }
        });

    }
});
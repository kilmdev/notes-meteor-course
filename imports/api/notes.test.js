import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if(Meteor.isServer) {
    describe('notes', function() {

        const noteOne = {
            _id: 'testNoteId1',
            title: 'My title',
            body: 'My body for note',
            updatedAt: 0,
            userId: 'testUserId1'
        }
        const noteTwo = {
            _id: 'testNoteId2',
            title: 'Things to buy',
            body: 'Couch',
            updatedAt: 0,
            userId: 'testUserId2'
        }        //this will run right before every test case in this 
        //  describe block
        beforeEach(function() {
            //Remove any data in db
            //  Test uses its own db, so this only effects test db data
            Notes.remove({}); 
            Notes.insert(noteOne);
            Notes.insert(noteTwo);
        })

        /*** Insert Tests ***/
        describe('notes: insert', function(){
            it('should insert new note', function() {
                const userId = 'testid';
                const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId: 'testid' });
    
                expect(Notes.findOne({ _id, userId })).toExist();
                //Notes.findOne({ _id, userId: 'testid' }); // non-ES6
            });

            it('should not insert note if unauthenticated', function() {
                expect(()=>{
                    Meteor.server.method_handlers['notes.insert']();
                }).toThrow();
            });
        });
        //*** Remove Tests ***/
        describe('notes: remove', function(){
            it('should remove note', function() {
                Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);

                expect(Notes.findOne({ _id: noteOne._id })).toNotExist();
            });

            it('should not remove note if unauthenticated', function(){
                expect(() => {
                    Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id])
                }).toThrow();
            });

            it('should not remove note if invalid _id', function() {
                expect(() => {
                    Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });
                }).toThrow();
            });
        });

        //***   Update Tests  ***/
        describe('notes: update', function(){
            it('should update note', function() {
                const title = 'This is an updated title'
                Meteor.server.method_handlers['notes.update'].apply({
                    userId: noteOne.userId
                }, [
                    noteOne._id,
                    { title }
                ]);

                const note = Notes.findOne(noteOne._id);
                
                expect(note.updatedAt).toBeGreaterThan(0);
        
                expect(note).toInclude({
                    body: noteOne.body,
                    title
                });
            });

            it('should throw error if extra updates provided', function(){
                expect(() => {
                    Meteor.server.method_handlers['notes.update'].apply({
                        userId: noteOne.userId
                    }, [
                        noteOne._id,
                        { title: 'new title', name: 'Kate' }
                    ]);
                }).toThrow();
            });
        
            it('should not update note if user was not creator', function() {
                const title = 'This is an updated title'
                Meteor.server.method_handlers['notes.update'].apply({
                    userId: "testid"
                }, [
                    noteOne._id,
                    { title }
                ]);

                const note = Notes.findOne(noteOne._id);
        
                expect(note).toInclude(noteOne);
            });

            it('should not update note if unauthenticated', function(){
                expect(() => {
                    Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id])
                }).toThrow();
            });

            it('should not update note if invalid _id', function() {
                expect(() => {
                    Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });
                }).toThrow();
            });

        });

        describe('notes: publication', function(){
            it('should return a users notes', function() {
                const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });

                //res is an array so you need to use fetch()
                const notes = res.fetch();

                expect(notes.length).toBe(1);
                expect(notes[0]).toEqual(noteOne);
            });

            it('should return zero notes for user that has none', function() {
                const res = Meteor.server.publish_handlers.notes.apply( {userId: 'sdsd'});
                
                //res is an array so you need to use fetch()
                const notes = res.fetch();

                expect(notes.length).toBe(0);
            });


        });

    });
}
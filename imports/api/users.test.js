import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { validateNewUser } from './users';

if (Meteor.isServer) {
    describe('users', function() {
        
        it('should allow valid email address', function(){
            //email used in function is 
            //    const email = user.emails[0].address;
            //need to mimic an object with data -- reverse engineer
            // the data
            const testUser = {
                emails: [
                    {
                        address: 'Test@example.com'
                    }
                ]
            };
            const res = validateNewUser(testUser);
    
            expect(res).toBe(true);
    
        });
        
        it('should reject invalid email', function() {

            const testUser = {
                emails: [
                    {
                        address: 'Testexamplecom'
                    }
                ]
            };
            expect(() => {
                validateNewUser(testUser);
            }).toThrow();
        });
            
    });
}








/*
const add = (a, b) => {
    if (typeof b != 'number') {
        return a + a;
    }
    return a + b;
};

const square = (a) => a * a;


describe('Add', function(){
    it('should add two numbers', function(){
        const res = add(11,9);
    
        expect(res).toBe(20);


    });

    it('should double a single number', function() {
        const res = add(44);

        expect(res).toBe(88);
    
    });
    
});



describe('Sqaure', function(){
    it('should square a number', function() {
        const res = square(2);
    
        expect(res).toBe(4);
    });
});
*/
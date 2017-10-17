import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

//non-containerized version
import { Signup } from './Signup'; 

if(Meteor.isClient) {
    describe('Signup', function () {
        //ensure error state works correctly
        it('should show error messages', function() {
            const error = 'This is not working';

            //create instance of Login and pass in an 
            // empty function = because we don't care
            //  if it ever gets called
            //Could pass in a spy, but we won't use it
            //  in our assertions, so there is no need
            const wrapper = mount(<Signup creatUser={() => {}}/>);

            //long version
            //wrapper.setState({ error: error });
            // vs. es6 shorthand
            wrapper.setState({ error });

            //Longer version
            //  const pText = wrapper.find('p').text();
            //  expect(pText).toBe(error);

            expect(wrapper.find('p').text()).toBe(error);

            wrapper.setState({ error: '' });

            //since we cleared error we expect there
            //  to be no <p> tags, so expect length to 
            //  be zero
            expect(wrapper.find('p').length).toBe(0);
        });

        it('should call createUser with the form data', function () {
            const email = 'kate@test.com';
            const password = 'password123';
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={ spy }/>);

            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;

            wrapper.find('form').simulate('submit');

            expect(spy.calls[0].arguments[0]).toEqual({ email, password });
        });

        it('should set error if short password', function () {
            const email = 'kate@test.com';
            const password = '123          ';
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={ spy }/>);

            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;

            wrapper.find('form').simulate('submit');

            expect(wrapper.state('error').length).toBeGreaterThan(0);
        });

        
        it('should set createUser callback errors', function () {
            const password = 'password123!';
            const reason = 'this is why it failed';
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={ spy }/>);

            wrapper.ref('password').node.value = password;
            //simulate a form submit to get spy called
            wrapper.find('form').simulate('submit');

            //calling with an error
            //  don't care what error is, just that it exists
            //    so passing in empty object
            spy.calls[0].arguments[1]({ reason });
            expect(wrapper.state('error')).toBe(reason);

            spy.calls[0].arguments[1]();
            expect(wrapper.state('error').length).toBe(0);
        });



    });
}
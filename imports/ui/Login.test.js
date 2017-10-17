import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

//non-containerized version
import { Login } from './Login'; 

if(Meteor.isClient) {
    describe('Login', function () {
        //ensure error state works correctly
        it('should show error messages', function() {
            const error = 'This is not working';

            //create instance of Login and pass in an 
            // empty function = because we don't care
            //  if it ever gets called
            //Could pass in a spy, but we won't use it
            //  in our assertions, so there is no need
            const wrapper = mount(<Login loginWithPassword={() => {}}/>);

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

        it('should call loginWithPassword with the form data', function () {
            const email = 'kate@test.com';
            const password = 'password123';
            const spy = expect.createSpy();
            const wrapper = mount(<Login loginWithPassword={ spy }/>);

            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;

            wrapper.find('form').simulate('submit');

            expect(spy.calls[0].arguments[0]).toEqual({ email });
            expect(spy.calls[0].arguments[1]).toBe(password);
        });

        it('should set loginWithPassword callback errors', function () {
            const spy = expect.createSpy();
            const wrapper = mount(<Login loginWithPassword={ spy }/>);

            //simulate a form submit to get spy called
            wrapper.find('form').simulate('submit');

            //calling with an error
            //  don't care what error is, just that it exists
            //    so passing in empty object
            spy.calls[0].arguments[2]({});

            //either works
            //expect(wrapper.state('error').length).toNotBe(0);
            expect(wrapper.state('error')).toNotBe('');

            spy.calls[0].arguments[2]();
            expect(wrapper.state('error')).toBe('');
        });



    });
}
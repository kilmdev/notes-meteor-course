import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';


export const validateNewUser = (user) => {
  const email = user.emails[0].address; //actual email value

  //setup simple shema and call validate
  //  could have created a variable storing the schema
  //  then run validation on that variable
  //  in this case we do it all at once
  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({ email })

  console.log('This is the user', user);
  return true;
  
};

if(Meteor.isServer) {
  Accounts.validateNewUser(validateNewUser);
}

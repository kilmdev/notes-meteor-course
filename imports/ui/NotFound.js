import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Page Not Found</h1>
        <p>We're unable to find that page</p>
        <Link to="/" className="button button--link">Return Home</Link>
      </div>
    </div>
  );
};
/*
export default class NotFound extends React.Component {
  render() {
    return <p>Not Found Component Here</p>;
  }
}
*/

/*
const NotFound = () => {
  return <p>Not Found Component Here</p>;
};
export default NotFound;
*/
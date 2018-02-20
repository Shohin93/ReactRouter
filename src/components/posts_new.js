import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this._onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this._renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this._renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this._renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }

  _onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  _renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input} // pre-generated event handlers
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title || values.title.length < 3) {
    errors.title = 'Enter a title that is at least 3 characters!';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories!';
  }
  if (!values.content) {
    errors.content = 'Enter some content!';
  }

  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  validate
})(
  connect(null, { createPost })(PostsNew)
);

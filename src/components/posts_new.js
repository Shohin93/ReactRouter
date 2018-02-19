import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

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
      </form>
    );
  }

  _onSubmit(values) {
    console.log(values);
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
})(PostsNew);

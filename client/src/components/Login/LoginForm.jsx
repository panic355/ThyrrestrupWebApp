 /*
 import React, { Component, PropTypes } from 'react'
 import { connect } from 'react-redux'
 import { createBlogPost } from '../../actions/todoadd';
 import { addTodo } from '../../actions/todo'
 import { setTodoDialogOpen, setErrorText } from '../../actions/todoDialog';
 import Dialog from 'material-ui/Dialog';
 import FlatButton from 'material-ui/FlatButton';
 import RaisedButton from 'material-ui/RaisedButton';
 import TextField from 'material-ui/TextField';



 const initialstate = {
  email: '',
  password: '',
  }

  class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = initialstate;
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    
    onChange(e) {
      if (e.target.id === 'email') {
          this.setState({ email: e.target.value });
      } else if (e.target.id === 'password') {
          this.setState({ password: e.target.value });
          console.log(e.target.value);
      }
  }

  handleSubmit() {
    const text = {
        news_email: this.state.email,
        news_password: this.state.password,
        operation:"insert"
    }
    alert(text.news_src_url);
    createBlogPost(text);
    setErrorText(undefined);
    setTodoDialogOpen(false);

};

render() {
  const { messages, todoDialog, setTodoDialogOpen, addTodo, setErrorText } = this.props;
  const styles = {
      button: {
          margin: 12,
      },
      exampleImageInput: {
          cursor: 'pointer',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          width: '100%',
          opacity: 0,
      },
  };

  function handleClose() {
    setErrorText(undefined);
    setTodoDialogOpen(false);
};

const actions = [< FlatButton label={
  messages.cancel || 'cancel'
}
  primary={
      true
  }
  onTouchTap={
      handleClose
  } />, < FlatButton label={
      messages.submit || 'submit'
  }
      primary={
          true
      }
      onTouchTap={this.handleSubmit} />
];

return (
  <div>
      <Dialog title={messages.todo_add || 'todo_add'} actions={actions} modal={false} open={todoDialog.open} onRequestClose={handleClose}>
          <form>
              <TextField ref="todoText1" onChange={this.onChange} id='title' hintText={messages.todo_hint1 || 'todo_hint'} errorText={todoDialog.errorText} floatingLabelText={messages.todo_label1 || 'todo_label1'} fullWidth={true} />
              <TextField ref="todoText2" onChange={this.onChange} id='desc' hintText={messages.todo_hint2 || 'todo_hint'} errorText={todoDialog.errorText} floatingLabelText={messages.todo_label2 || 'todo_label2'} fullWidth={true} multiLine={true} rows={1} rowsMax={3} />
          </form>
      </Dialog>
  </div>
)
}
}*/




import styled from "styled-components";
import React, {Component} from "react";
var CreateReactClass = require('create-react-class');


var loginForm = CreateReactClass({
    render: function() {
      return (
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossOrigin="anonymous" />
          <link rel="stylesheet" href="/style.css" />
          
          <title>Document</title>
          <div className="container mt-4">
            <div className="card">
              <div className="card-header">
                Login <form />
              </div>
              <div className="card-body">
                <form action="/auth/login" method="POST">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" className="form-control" id="email" name="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" />
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

  
export default loginForm;
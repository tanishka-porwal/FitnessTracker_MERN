import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props); //constructor of sub class starts with this
        
        //binding 'this' to each of these methods
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        //fields name corresponds to mongodb document
        this.state = {
            username : ""
        }
    }

    onChangeUsername(e){
        this.setState({
            username:e.target.value  //target is textbox and value is the new username
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user); 
        //this method will send data to this backend endpoint and json obj is user which it is expecting
        axios.post('http://localhost:5000/users/add' , user)
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        })
    
    }
  render(){
      return(
          <div>
              <h3>Create new User</h3>
              <form onSubmit = {this.onSubmit}>
                  <div className="form-group">
                      <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value ={this.state.username}
                            onChange ={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
          </div>
      )
  }
}
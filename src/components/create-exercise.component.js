import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
    constructor(props) {
        super(props); //constructor of sub class starts with this
        
        //binding 'this' to each of these methods
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        //fields name corresponds to mongodb document
        //state is used for defining variables in react so whenever 
        //anything is updated it is automatically updated on the page
        this.state = {
            username : "",
            description: "",
            duration: 0, //because number
            date: new Date(),
            users:[] //for dropdown menu
        }
    }

    //react lifecycle methods
    componentDidMount(){
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if(response.data.length > 0) {//atleast 1 user
                this.setState({
                    users: response.data.map(user => user.username),
                    username:response.data[0].username
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    onChangeUsername(e){
        this.setState({
            username:e.target.value  //target is textbox and value is the new username
        });
    }

    onChangeDescription(e){
        this.setState({
            description:e.target.value  //target is textbox and value is whats in the textbox
        });
    }

    onChangeDuration(e){
        this.setState({
            duration:e.target.value  //target is textbox and value is whats in the textbox
        });
    }

    onChangeDate(date){
        this.setState({
            date: date  
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise); 
        axios.post('http://localhost:5000/exercises/add' , exercise)
            .then(res => console.log(res.data));

        window.location ='/'; //back to home pge, where there is list of exercise
    }
  render(){
      return(
          <div>
              <h3>Create new exercise log</h3>
              <form onSubmit = {this.onSubmit}>
                  <div className="form-group">
                      <label>Username: </label>
                      <select ref="userInput"
                        required
                        className="form-control"
                        value ={this.state.username}
                        onChange ={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) { //it will take each user from the array and return an option
                                    return <option 
                                    //key=value=actual_text = user
                                        key={user}
                                        value={user}>{user} 
                                        </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text" className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                        <DatePicker
                            selected={this.state.date} //original selection
                            onChange={this.onChangeDate}
                        />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
      )
  }
}
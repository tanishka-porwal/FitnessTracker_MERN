import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//functional react component
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

//class component
export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state ={exercises: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data})
        })
            .catch((error) => {
                console.log(error);
            })
    } 

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data));

            //table in which there will be execrise is each row
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id) //way of removing the id wali row from the table, by matching that it is eqaul or not
        })
    }

    exercisesList(){
        return this.state.exercises.map(currentexercise => { //map returns something for every element in the array
            return <Exercise exercise = {currentexercise} deleteExercise = {this.deleteExercise} key = {currentexercise._id} />; //3propps in Exercise Component
        })
    }
  render(){
      return(
          <div>
              <h3>Logged Exercises</h3>
              <table className = "table">
                  <thead className = "thead-light">
                      <tr>
                          <th>Username</th>
                          <th>Description</th>
                          <th>Duration</th>
                          <th>Date</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.exercisesList()}
                  </tbody>
              </table>
          </div>
      )
  }
}
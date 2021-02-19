// import React, { Component } from "react";
import firebase from "../Firebase";
// class User extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//      email: "",
//      fullname: ""
//     };
//   }
//   updateInput = e => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   }
//   addUser = e => {
//     e.preventDefault();
//     const db = firebase.firestore();
//     db.settings({
//       timestampsInSnapshots: true
//     });
//     const userRef = db.collection("users").add({
//       fullname: this.state.fullname,
//       email: this.state.email
//     });  
//     this.setState({
//       fullname: "",
//       email: ""
//     });
//   };
//   render() {
//     return (
//       <div style={{padding:100}} >
// <form onSubmit={this.addUser}>
//   <input
//     type="text"
//     name="fullname"
//     placeholder="Full name"
//     onChange={this.updateInput}
//     value={this.state.fullname}
//   />
//   <input
//     type="email"
//     name="email"
//     placeholder="Full name"
//     onChange={this.updateInput}
//     value={this.state.email}
//   />
//           <button type="submit">Submit</button>
//         </form>
//         </div>
//         );
//       }
//    }
// export default User;

// class User extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { values: [] };
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   createUI(){
//      return this.state.values.map((el, i) => 
//          <div key={i}>
//     	    <input type="file" value={el||''} onChange={this.handleChange.bind(this, i)} />
//     	    <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
//          </div>          
//      )
//   }

//   handleChange(i, event) {
//      let values = [...this.state.values];
//      values[i] = event.target.value;
//      this.setState({ values });
//   }
  
//   addClick(){
//     this.setState(prevState => ({ values: [...prevState.values, '']}))
//   }
  
//   removeClick(i){
//      let values = [...this.state.values];
//      values.splice(i,1);
//      this.setState({ values });
//   }

//   handleSubmit(event) {
//     alert('A name was submitted: ' + this.state.values.join(', '));
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <div style={{padding:100}} >
//       <form onSubmit={this.handleSubmit} >
//           {this.createUI()}        
//           <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
//           <input type="submit" value="Submit" />
//       </form>
//       <ul>
//       {this.state.values.map((value, index) => {
//         return <img src={value} />
//       })}
      
//     </ul>
//       </div>
//     );
//   }
// }
// export default User;

import React, {Component} from "react"; 
import ReactDOM from "react-dom"; 
import "./style.css"; 
import questionAPI from './Question'; 
import QuestionBox from './QuestionBox'; 
import Result from './ResultBox'; 
  
export default class About extends Component { 
  constructor() { 
    super(); 
    this.state = { 
      questionBank: [], 
      score: 0, 
      responses: 0 
    }; 
  } 
  
  // Function to get question from ./question 
  getQuestions = () => { 
    questionAPI().then(question => { 
      this.setState({questionBank: question}); 
    }); 
  }; 
  
  // Set state back to default and call function 
  playAgain = () => { 
    this.getQuestions(); 
    this.setState({score: 0, responses: 0}); 
  }; 
  
  // Function to compute scores 
  computeAnswer = (answer, correctAns) => { 
    if (answer === correctAns) { 
      this.setState({ 
        score: this.state.score + 1 
      }); 
    } 
    this.setState({ 
      responses: this.state.responses < 5 
        ? this.state.responses + 1 
        : 5 
    }); 
  }; 
  
  // componentDidMount function to get question 
  componentDidMount() { 
    this.getQuestions(); 
  } 
  
  render() { 
    return (<div className="container"> 
      <div className="title"> 
        QuizOn 
      </div> 
  
      {this.state.questionBank.length > 0 &&  
       this.state.responses < 5 &&  
       this.state.questionBank.map(({question, answers, 
       correct, questionId}) => <QuestionBox question= 
       {question} options={answers} key={questionId} 
       selected={answer => this.computeAnswer(answer, correct)}/>)} 
  
      { 
        this.state.responses === 5 
          ? (<Result score={this.state.score} 
            playAgain={this.playAgain}/>) 
          : null
      } 
  
    </div>) 
  } 
} 
import React from "react";

export default class Layout extends React.Component{
  static defaultProps= {
    quiz: [{
      question: "What is React",
      choices: ["Framework", "Transpiler", "Compiler"],
      answer: 0
    },
    {
      question: "What is Webpack",
      choices: ["Framework", "Module Bundler", "Compiler"],
      answer: 1
    }
  ]
  };
  constructor(props){
    super(props);
    this.state={
      quizCount: 0,
      score: 0
    }
  }
  getNextQuestion(){
    this.setState({quizCount: this.state.quizCount + 1});
  }
  incrementScore(){
    this.setState({score: this.state.score + 1});
  }
  render(){
    let { quiz }= this.props;
    let { quizCount, score } = this.state;
    let content= null;

    if(quizCount < quiz.length){
      content = <QuizContent currentQuiz={quiz[quizCount]}
        getNextQuestion= {this.getNextQuestion.bind(this)}
        incrementScore={this.incrementScore.bind(this)} />
    } else{
      //Show the score page
      content = <p class="class_score">Your score is : {score}</p>
    }
    return(
      <div>
        <QuizHeader />
        {content}
        <QuizFooter />
      </div>
      );
  }
}

class QuizHeader extends React.Component{
  render(){
    return(
      <header>
        <h2>React Quiz App</h2>
      </header>
    );
  }
}

class QuizContent extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      ifButtonSubmit: true
    }
  }
  clickSubmit(){
    let { currentQuiz }= this.props;
    let userChoice = document.querySelector('input[name="choices"]:checked');
    //disable radio buttons on submitting the answer
    var ele = document.getElementsByName('choices');
    for(var i= 0;i < ele.length; i++){
      ele[i].disabled= true;
    }
    if(userChoice){
      userChoice = Number(userChoice.value);
      if(userChoice === currentQuiz.answer){
        //increment score
        this.props.incrementScore();
      }
      document.getElementById(userChoice).style.backgroundColor = "#d66481"; //highlight the wrong answer with red color
    }
    document.getElementById(currentQuiz.answer).style.backgroundColor = "#64d671"; //highlight the wrong answer with green color
  }
  clickNext(){
    this.props.getNextQuestion();
    // clear all radio buttons for new question
    var ele = document.getElementsByName('choices');
    for(var i=0; i< ele.length; i++){
      ele[i].checked = false;
      ele[i].disabled = false;
    }
    //setting the default color when loading the new question
    var arrChoice = document.getElementsByClassName('choice_name');
    for(var i=0; i< arrChoice.length; i++){
      arrChoice[i].style.backgroundColor= "white";
    }
  }
  clickButton(e){
    let { ifButtonSubmit } = this.state;
    if(ifButtonSubmit){
      //do the submit actions
      this.clickSubmit();
    }else{
      //do the next actions
      this.clickNext();
    }
    this.setState({ifButtonSubmit: !ifButtonSubmit});
  }
  render(){
    let { currentQuiz } = this.props;
    let { ifButtonSubmit } = this.state;
    let buttonText = null;
    ifButtonSubmit ? (buttonText = 'SUBMIT') : (buttonText = 'NEXT');
    return(
      <div class="class_layout">
        {currentQuiz.question}
        <Choices choices={currentQuiz.choices} />
        <button onClick={this.clickButton.bind(this)}>{buttonText}</button>
      </div>
    )
  }
}

class QuizFooter extends React.Component{
  render(){
    return(
      <footer>
        <p>(c) Marie Sajan 2016</p>
      </footer>
    );
  }
}

class Choices extends React.Component{
  render(){
    let { choices } = this.props;
    var createChoice = function(choice, index){
      return (
        <div class="div_radio" key={index}>
          <input name="choices" value={index} type="radio" /><label class="choice_name" id={index}>{choice}</label>
          <br/>
        </div>
      );
    };
    return (
      <div>
        {choices.map(createChoice)}
      </div>
    );
  }
}

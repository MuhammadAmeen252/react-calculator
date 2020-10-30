
//SP18-BCS-098-6AB(Muhammad Ameen)
import React from "react";
import "./App.css";
import { Button } from "react-bootstrap";
//i used bootsrap libraries by taking help from internet 
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

class App extends React.Component {
  constructor(props) {
    //pass props to its parent Component
    super(props);
    this.keyboardHandler = this.keyboardHandler.bind(this);
    //initial states for all the buttons
    this.state = {
      
      currentNumber: "0",
      //for checkig if the input is operator
      operatorFlag: false,
      //for checking the number is decimal
      decimalFlag: false
    };
    
    
  }
  //handle click handles all the events when any button is clicked
  handleClick = buttonName => {
    let currentNumber = this.state.currentNumber;
    let operatorFlag = this.state.operatorFlag;
    let decimalFlag = this.state.decimalFlag;
    switch (true) {
      case buttonName === "0" ||
        buttonName === "1" ||
        buttonName === "2" ||
        buttonName === "3" ||
        buttonName === "4" ||
        buttonName === "5" ||
        buttonName === "6" ||
        buttonName === "7" ||
        buttonName === "8" ||
        buttonName === "9":
        //if the current number is 3not equal is 0 then it is added to input by its button name
        // and opertaor flag is turned off
        if (this.state.currentNumber !== "0") {
          currentNumber += buttonName;
          operatorFlag = false;
        } else {
          //if no number is added before then current number os the only input
          currentNumber = buttonName;
        }
        break;

        //checks for operators
      case buttonName === "+" ||
        buttonName === "%"  ||
        buttonName === "-" ||
        buttonName === "/" ||
        buttonName === "*":
        //it checks if no operator is added before to input then add it to input otherwise not
        // and turn the operator flag true
        if (!operatorFlag) {
          currentNumber += buttonName;
          operatorFlag = true;
          decimalFlag = false;
        } else {
          //seperate the new number from operator by slicing it and making sub string
          const newNumber = currentNumber.slice(0, -1);
          if(buttonName ==="%"){
            newNumber %= currentNumber 
          }
          //console.log(newNumber)
          currentNumber = newNumber + buttonName;
        }
        break;
        //clear the input
      case buttonName === "C":
        currentNumber = "0";
        operatorFlag = false;
        decimalFlag = false;
        break;
      case buttonName === "=":
        if(currentNumber.includes("%")){
          let expressions=currentNumber.split("%")
          //eval() evaluates the expression i.e 1*2=1 or 2+1=3
          let expression1=eval(expressions[0])
          let expression2=eval(expressions[1])
          
          currentNumber= expression1 % expression2
          //console.log(currentNumber+'curr')
        }
        else{
          currentNumber = eval(currentNumber);
        }
        operatorFlag = false;
        decimalFlag = true;
        break;
        //if . is added then num is decimal and decimal flag is turned on
      case buttonName === ".":
        if (!decimalFlag) {
          currentNumber += buttonName;
          decimalFlag = true;
        }
    }
    //change the states according to current input button
    this.setState({ decimalFlag });
    this.setState({ currentNumber });
    this.setState({ operatorFlag });
  };
//it handles clicks from keyboard
//i tried to add this functionality but there are still bugs in it
  keyboardHandler() {
    document.addEventListener("keydown", (e) => {
      const buttonName = e.key.toString();
      console.log(buttonName+'  button anme')
      let currentNumber = this.state.currentNumber;
      let operatorFlag = this.state.operatorFlag;
      let decimalFlag = this.state.decimalFlag;
      switch (true) {
        case buttonName === "0" ||
          buttonName === "1" ||
          buttonName === "2" ||
          buttonName === "3" ||
          buttonName === "4" ||
          buttonName === "5" ||
          buttonName === "6" ||
          buttonName === "7" ||
          buttonName === "8" ||
          buttonName === "9":
          //if the current number is not equal is 0 then it is added to input by its button name
          // and opertaor flag is turned off
          if (this.state.currentNumber !== "0") {
            currentNumber += buttonName;
            operatorFlag = false;
          } else {
            //if no number is added before then current number os the only input
            currentNumber = buttonName;
          }
          break;

        //checks for operators
        case buttonName === "+" ||
          buttonName === "%" ||
          buttonName === "-" ||
          buttonName === "/" ||
          buttonName === "*":
          //it checks if no operator is added before to input then add it to input otherwise not
          // and turn the operator flag true
          if (!operatorFlag) {
            currentNumber += buttonName;
            operatorFlag = true;
            decimalFlag = false;
          } else {
            //seperate the new number from operator by slicing it and making sub string
            const newNumber = currentNumber.slice(0, -1);
            if (buttonName === "%") {
              currentNumber =currentNumber % newNumber;
            }
            else{
              currentNumber = newNumber + buttonName;
            }
            console.log('new num'+newNumber);
            
          }
          break;
        //clear the input
        case buttonName === "C":
          currentNumber = "0";
          operatorFlag = false;
          decimalFlag = false;
          break;
        case buttonName === "Enter":
          
          //eval() evaluates the expression i.e 1*2=1 or 2+1=3
          currentNumber = eval(currentNumber);
          operatorFlag = false;
          decimalFlag = true;
          //console.log(currentNumber+'curr')
          break;
        //if . is added then num is decimal and decimal flag is turned on
        case buttonName === ".":
          if (!decimalFlag) {
            currentNumber += buttonName;
            decimalFlag = true;
          }
      }
      //change the states according to current input button
      console.log(currentNumber)
      this.setState({ decimalFlag });
      this.setState({ currentNumber });
      this.setState({ operatorFlag });
    });
  }

  render() {
    return (
      <div onClick={this.keyboardHandler}>
        {/* //container contains the all claculator */}
        <Container>
          {/* using row class of bootstrap */}
          <Row
          // changing the styles of row class
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Col xs={8} md={5} lg={3}>
              <div id="calcGrid">
                <div id="buttonBox">
                  {/* screen componenet displays the input and claculations */}
                  <Screen currentNumber={this.state.currentNumber} />
                  {/* we use name property to get values of all the buttons pressed and
                  on every click handle click function is called ... Id is to set the css*/}
                  <Btn id="zero" name="0" handleClick={this.handleClick} />
                  <Btn id="one" name="1" handleClick={this.handleClick} />
                  <Btn id="two" name="2" handleClick={this.handleClick} />
                  <Btn id="three" name="3" handleClick={this.handleClick} />
                  <Btn id="four" name="4" handleClick={this.handleClick} />
                  <Btn id="five" name="5" handleClick={this.handleClick} />
                  <Btn id="six" name="6" handleClick={this.handleClick} />
                  <Btn id="seven" name="7" handleClick={this.handleClick} />
                  <Btn id="eight" name="8" handleClick={this.handleClick} />
                  <Btn id="nine" name="9" handleClick={this.handleClick} />
                  <Btn id="clear" name="C" handleClick={this.handleClick} />
                  <Btn id="equals" name="=" handleClick={this.handleClick} />
                  <Btn
                    id="decimal"
                    name="."
                    handleClick={this.handleClick}
                  />
                  <Btn id="mod" name="%" handleClick={this.handleClick} />
                  <Btn id="add" name="+" handleClick={this.handleClick} />
                  <Btn
                    id="subtract"
                    name="-"
                    handleClick={this.handleClick}
                  />
                  <Btn
                    id="multiply"
                    name="*"
                    handleClick={this.handleClick}
                  />
                  <Btn id="divide" name="/" handleClick={this.handleClick} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

//it displays the input on screen
class Screen extends React.Component {
  render() {
    return <div id="display">{this.props.currentNumber}</div>;
  }
}

//Btn component is for buttons and there states behaviour
class Btn extends React.Component {
  //whenever a button is clicked rumParentHandleClick button is called
  //for passing data from clild componenet to parent by using props(properties) behaviour of react
  runParentHandleClick = () => {
    this.props.handleClick(this.props.name);
  };

  render() {
    return (
      <Button
        //className="elButton"
        variant="outline-secondary"
        id={this.props.id}
        onClick={this.runParentHandleClick}
        className="button"
      >
        {/* we passed a name string  to ChildComponent via name,then it can access it by
         referencing it as key in the props argument: this.props.name */}
        {this.props.name}
      </Button>
    );
  }
}

export default App;

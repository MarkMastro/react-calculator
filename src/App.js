import { computeHeadingLevel, getDefaultNormalizer } from "@testing-library/react";
import React, {useReducer, useState} from "react";
import './App.css';
import Button from './Components/Button';
function App() {

  const [firstNum, setFirstNum] = useState(null);
  const [operand, setOperand] = useState("");
  const [newNumberFlag, setNewNumberFlag] = useState(true);
  const [displayState, dispatch] = useReducer(reducer, { displayValue: "0", miniDisplayValue: ""});

  function reducer(displayState, action) {
    let answer;
    switch(action.type){
      case "+":
        answer = parseFloat(displayState.displayValue) + parseFloat(firstNum);
        return {displayValue: answer, miniDisplayValue: answer + operand};
              
      case "-":
        answer = parseFloat(firstNum) - parseFloat(displayState.displayValue);
        return {displayValue: answer, miniDisplayValue: answer + operand};

      case "x":
        answer = parseFloat(firstNum) * parseFloat(displayState.displayValue)
        return {displayValue: answer, miniDisplayValue: answer + operand};

      case "÷":
        answer = parseFloat(firstNum) / parseFloat(displayState.displayValue);
        return {displayValue: answer, miniDisplayValue: answer + operand};
      
      case "1/x":
         answer = 1/parseFloat(displayState.displayValue)
         return {displayValue: answer, miniDisplayValue: answer + operand}

      case "x²":
        answer = parseFloat(displayState.displayValue) * parseFloat(displayState.displayValue)
        return {displayValue: answer, miniDisplayValue: answer + "²"};

      case "√x":
        answer = Math.sqrt(parseFloat(displayState.displayValue)) 
        return {displayValue: answer, miniDisplayValue: "√" + answer};
        
      case "=":
        break;
            
      case "C":
        return {displayValue: "0", miniDisplayValue: ""};
        
      
      case "1":
        return {displayValue: displayState.displayValue + "1", miniDisplayValue: ""};
      case "2":
        return {displayValue: displayState.displayValue + "2", miniDisplayValue: ""};
      case "3":
        return {displayValue: displayState.displayValue + "3", miniDisplayValue: ""};
      case "4":
        return {displayValue: displayState.displayValue + "4", miniDisplayValue: ""};
      case "5":
        return {displayValue: displayState.displayValue + "5", miniDisplayValue: ""};
      case "6":
        return {displayValue: displayState.displayValue + "6", miniDisplayValue: ""};
      case "7":
        return {displayValue: displayState.displayValue + "7", miniDisplayValue: ""};
      case "8":
        return {displayValue: displayState.displayValue + "8", miniDisplayValue: ""};
      case "9":
        return {displayValue: displayState.displayValue + "9", miniDisplayValue: ""};
      case "back":
        break;
      
      default:
        throw new Error();
    }
  }


  const numberButtons = [
    {"value": 7, "type": "number"},
    {"value": 8, "type": "number"},
    {"value": 9, "type": "number"},
    {"value": 4, "type": "number"},
    {"value": 5, "type": "number"},
    {"value": 6, "type": "number"},
    {"value": 1, "type": "number"},
    {"value": 2, "type": "number"},
    {"value": 3, "type": "number"},
    {"value": "+/-", "type": "number"},
    {"value": 0, "type": "number"},
    {"value": ".", "type": "number"},
  ]

  const operandButtons = [
    {"value": "1/x" , "type": "operand"},
    {"value": "x²" , "type": "operand"},
    {"value": "√x" , "type": "operand"},
    {"value": "÷" , "type": "operand"},
    {"value": "x" , "type": "operand"},
    {"value": "-" , "type": "operand"},
    {"value": "+" , "type": "operand"},
    {"value": "=" , "type": "operand"},
  ]

  const editButtons = [
    {"value": "%" , "type": "edit"},
    {"value": "CE" , "type": "edit"},
    {"value": "C" , "type": "edit"},
    {"value": "back" , "type": "edit"},
  ]

  // const numberClick=(value) => {
  //   if(newNumberFlag){
  //     setDisplayValue(value)
  //   } else {
  //    setDisplayValue(displayValue+value)
  //   }

  //   switch(value){
  //     case("+/-"):
  //       setDisplayValue(displayValue - (2 * displayValue))
  //       break;
  //     case("."):
  //       setDisplayValue(displayValue + ".")
  //       break;
  //     default:
  //       break;
  //   }
    
    
  //   setNewNumberFlag(false)
  // }

  // const computeAnswer = (newOperand) => {
  //   let answer;
  //   switch(operand){
  //     case "+":
  //       answer = parseFloat(displayValue) + parseFloat(firstNum);
  //       setDisplayValue(answer);
  //       setMiniDisplayValue(answer + newOperand);
  //       return answer;
  //     case "-":
  //       answer = parseFloat(firstNum) - parseFloat(displayValue);
  //       setDisplayValue(answer);
  //       setMiniDisplayValue(answer + newOperand);
  //       return answer;
  //     case "x":
  //       answer = parseFloat(displayValue) * parseFloat(firstNum);
  //       setDisplayValue(answer);
  //       setMiniDisplayValue(answer + newOperand);
  //       return answer;
  //     case "÷":
  //       answer = parseFloat(firstNum) / parseFloat(displayValue);
  //       setDisplayValue(answer);
  //       setMiniDisplayValue(answer + newOperand);
  //       return answer;
        
  //     default:
  //       break;
  //   }
  // }

  // const operandClick = (value) => {
  //   if(miniDisplayValue !== "" && newNumberFlag===false) {
  //     setOperand(value)
  //     setFirstNum(computeAnswer(value))

  //   } else if (miniDisplayValue !== "" && newNumberFlag===true) {
  //     setOperand(value)
  //     setMiniDisplayValue(miniDisplayValue.slice(0,-1)+ value)
  //   }
  //   else {
  //     setOperand(value);
  //     setFirstNum(displayValue)
  //     setMiniDisplayValue(displayValue+value)
  //   }

  //   setNewNumberFlag(true)
  // }

  // const editClick = (value) => {
  //   switch(value){
  //     case "C":
  //       setDisplayValue("0");
  //       setNewNumberFlag(true);
  //       setMiniDisplayValue("");
  //       setFirstNum(null);
  //       setOperand()
  //       break;
  //     default:
  //       break;
  //   }

  // }
  return (  

    <div className="main">
      <div className="mini-display">
        {displayState.miniDisplayValue}
      </div>
      <div className='display'>
        {displayState.displayValue}
      </div>
      <div className="grid">
          {editButtons.map((button) => {return <Button key={button.value} {...button} onClick={e=>editClick(e.target.value)}/>})}
          <div className="number-grid">
            {numberButtons.map((button) => {return <Button key={button.value} {...button} onClick={e=>dispatch({type: e.target.value})}/>})}
          </div>
        {operandButtons.map((button) => {return <Button key={button.value} {...button} onClick={e=>operandClick(e.target.value)}/>})}
      </div>
    </div>
  );
}

export default App;

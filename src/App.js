import { computeHeadingLevel, getDefaultNormalizer } from "@testing-library/react";
import React, {useReducer, useState} from "react";
import './App.css';
import Button from './Components/Button';
function App() {

  const [operand, setOperand] = useState("");
  const [newNumberFlag, setNewNumberFlag] = useState(true);
  const [displayState, dispatch] = useReducer(reducer, { displayValue: "0", miniDisplayValue: "", firstNum: null});

  function reducer(displayState, action) {
    let answer;
    
    switch(action.type){
      case "+":
        console.log("+", operand)
        answer = parseFloat(displayState.displayValue) + parseFloat(displayState.firstNum);
        return {displayValue: answer, miniDisplayValue: answer + operand, firstNum: answer};
              
      case "-":
        answer = parseFloat(displayState.firstNum) - parseFloat(displayState.displayValue);
        return {...displayState, displayValue: answer, miniDisplayValue: answer + operand, firstNum: answer};

      case "x":
        answer = parseFloat(displayState.firstNum) * parseFloat(displayState.displayValue)
        return {...displayState, displayValue: answer, miniDisplayValue: answer + operand, firstNum: answer};

      case "÷":
        answer = parseFloat(displayState.firstNum) / parseFloat(displayState.displayValue);
        return { displayValue: answer, miniDisplayValue: answer + operand, firstNum: answer};
      
      case "1/x":
         answer = 1/parseFloat(displayState.displayValue)
         return { displayValue: answer, miniDisplayValue: "1/" + displayState.displayValue + " ", firstNum: answer}

      case "x²":
        answer = parseFloat(displayState.displayValue) * parseFloat(displayState.displayValue)
        return { ...displayState, displayValue: answer, miniDisplayValue: action.payload + "² ", firstNum: answer};

      case "√x":
        console.log("sqrt")
        answer = Math.sqrt(parseFloat(displayState.displayValue)) 
        console.log(answer)
        return {...displayState, displayValue: answer, miniDisplayValue: "√" + displayState.displayValue + " ", firstNum: answer};
            
      case "C":
        return {displayValue: "0", miniDisplayValue: "", firstNum: null};
        
      case "append-number":
        return { ...displayState, displayValue: displayState.displayValue + action.payload};
  
      case "new-number":
        return { ...displayState, displayValue: action.payload};

      case "+/-":
        return {...displayState, displayValue: displayState.displayValue - (2 * displayState.displayValue)}

      case ".":
        return {...displayState, displayValue: displayState.displayValue + "."}

      case "change-operand":
        return {...displayState, miniDisplayValue: displayState.miniDisplayValue.slice(0,-1) + action.payload};

      case "new-operation":
        return {...displayState, miniDisplayValue: displayState.displayValue + action.payload, firstNum: displayState.displayValue}
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

  const numberClick=(value) => {
    if(value === "+/-"){
      dispatch({type: '+/-', payload: null});
      setOperand("");
      setNewNumberFlag(false);
      return;
    }
    if(newNumberFlag){
      dispatch({type: 'new-number', payload: value})
    } else {
      dispatch({type: 'append-number', payload: value})
    }

    setNewNumberFlag(false)
  }

  const operandClick = (value) => {

    if(displayState.miniDisplayValue !== "" && newNumberFlag===false) {
      dispatch({type: operand, payload:null})
      setOperand(value)

    } else if (displayState.miniDisplayValue !== "" && newNumberFlag===true) {
      console.log("change-operand")
      setOperand(value)
      dispatch({type: "change-operand", payload: value})
    }
    else {
      if( ["1/x", "x²", "√x"].includes(value)){
        dispatch({type: value, payload: displayState.displayValue})
        setOperand(value)
        setNewNumberFlag(true)
        return;
      }
      console.log("new-operation")
      setOperand(value);
      dispatch({type: "new-operation", payload: value})
    }

    setNewNumberFlag(true)
  }

  const editClick = (value) => {
    switch(value){
      case "C":
        dispatch({type: "C", payload:null})
        setNewNumberFlag(true);
        setOperand()
        break;
      default:
        break;
    }

  }
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
            {numberButtons.map((button) => {return <Button key={button.value} {...button} onClick={e=>numberClick(e.target.value)}/>})}
          </div>
        {operandButtons.map((button) => {return <Button key={button.value} {...button} onClick={e=>operandClick(e.target.value)}/>})}
      </div>
    </div>
  );
}

export default App;

import { useReducer } from "react";

//make interface for whole state
interface decisionState {
  choices: string[];
}
interface action {
  type: string;
  value: string;
  index: number;
}

export default function DecisionMaker() {
  const initialState = {
    choices: ["", "", ""],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state: decisionState, action: action) {
    let newState;
    if (action.type === "addChoice") {
      //   newState = { ...state, choices: [...state.choices, action.value] };
      newState = {
        ...state,
        choices: [...state.choices].map((el, i) =>
          i === action.index ? action.value : el
        ),
      };
      return newState;
    } else {
      throw new Error();
    }
  }
  //placeholders: brownies, pizza, sandwhich
  console.log(state);
  return (
    <>
      <p>choices:</p>
      {state.choices.map((el, i) => (
        <input
          key={i}
          value={el}
          onChange={(e) =>
            dispatch({ type: "addChoice", value: e.target.value, index: i })
          }
        ></input>
      ))}
      {/* <input
        placeholder="e.g. brownies"
        value=""
        onChange={(e) => dispatch({ type: "addChoice", value: e.target.value })}
      ></input>
      <input
        placeholder="e.g. pizza"
        value=""
        onChange={(e) => dispatch({ type: "addChoice", value: e.target.value })}
      ></input>
      <input
        placeholder="e.g. sandwhich"
        value=""
        onChange={(e) => dispatch({ type: "addChoice", value: e.target.value })}
      ></input> */}
    </>
  );
}

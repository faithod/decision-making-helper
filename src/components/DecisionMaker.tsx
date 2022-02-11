import { useReducer } from "react";

//make interface for whole state
//put in seperate folder, extract out what you can
interface attributeElement {
  attributeName: string;
  weight: undefined | number;
}

interface decisionState {
  choices: string[];
  attributes: attributeElement[];
}

interface action {
  type: string;
  value: string;
  index: number;
}

export default function DecisionMaker() {
  const initialState = {
    choices: ["", "", ""],
    attributes: [
      {
        attributeName: "",
        weight: undefined,
      },
      {
        attributeName: "",
        weight: undefined,
      },
      {
        attributeName: "",
        weight: undefined,
      },
    ],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state: decisionState, action: action) {
    let newState;
    //is switch preffered to if/else?
    if (action.type === "addChoice") {
      //   newState = { ...state, choices: [...state.choices, action.value] };
      newState = {
        ...state,
        choices: [...state.choices].map((el, i) =>
          i === action.index ? action.value : el
        ),
      };
    } else if (action.type === "addAttribute") {
      newState = {
        ...state,
        attributes: [...state.attributes].map((el, i) =>
          i === action.index ? { ...el, attributeName: action.value } : el
        ),
      };
    } else if (action.type === "addWeight") {
      const chosenWeight = parseInt(action.value);
      newState = {
        ...state,
        attributes: [...state.attributes].map((el, i) =>
          i === action.index ? { ...el, weight: chosenWeight } : el
        ),
      };
    } else {
      throw new Error();
    }
    return newState;
  }
  //placeholders: brownies, pizza, sandwhich
  console.log(state);
  return (
    <>
      <form>
        <fieldset>
          <legend>choices:</legend>
          {state.choices.map((el: string, i: number) => (
            <input
              key={i}
              type="text"
              value={el}
              onChange={(e) =>
                dispatch({ type: "addChoice", value: e.target.value, index: i })
              }
            ></input>
          ))}
        </fieldset>
        <fieldset>
          <legend>attributes and relative importance:</legend>
          {state.attributes.map((el: attributeElement, i: number) => (
            <div key={i}>
              <input
                type="text"
                value={el.attributeName}
                onChange={(e) =>
                  dispatch({
                    type: "addAttribute",
                    value: e.target.value,
                    index: i,
                  })
                }
              ></input>
              {":"}
              <select
                name="weights"
                id="weights"
                onChange={(e) =>
                  dispatch({
                    type: "addWeight",
                    value: e.target.value,
                    index: i,
                  })
                }
              >
                <option selected disabled>
                  select one
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          ))}
        </fieldset>
      </form>
      {/* add label to inputs */}
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

import { useReducer } from "react";
import calculateTotal from "../utils/calculateTotal";
import getRatings from "../utils/getRatings";
import getWeights from "../utils/getWeights";
import ChoiceCard from "./ChoiceCard";

//put in seperate folder, extract out what you can
export interface attributeElement {
  attributeName: string | number[];
  weight: undefined | number;
}
export interface choiceValuesElement {
  choiceName: string | number[]; //change to just string
  ratings: (number | undefined)[];
  score: undefined | number;
}
interface decisionState {
  choices: choiceValuesElement[];
  attributes: attributeElement[];
  winner: undefined | string;
}

export interface action {
  type: string;
  value: string | number[];
  index?: number;
  attributeIndex?: number;
}

function reducer(state: decisionState, action: action): decisionState {
  //is switch preffered to if/else?
  if (action.type === "addChoice") {
    return {
      ...state,
      choices: [...state.choices].map((el, i) =>
        i === action.index ? { ...el, choiceName: action.value } : el
      ),
    };
  } else if (action.type === "addAttribute") {
    return {
      ...state,
      attributes: [...state.attributes].map((el, i) =>
        i === action.index ? { ...el, attributeName: action.value } : el
      ),
    };
  } else if (action.type === "addWeight") {
    const chosenWeight = parseInt(
      typeof action.value === "string" ? action.value : ""
    );
    return {
      ...state,
      attributes: [...state.attributes].map((el, i) =>
        i === action.index ? { ...el, weight: chosenWeight } : el
      ),
    };
  } else if (action.type === "addRating") {
    return {
      ...state,
      choices: [...state.choices].map((el, i) => {
        if (i === action.index) {
          const chosenRating = parseInt(
            typeof action.value === "string" ? action.value : ""
          );
          const ratings = el.ratings.map((rating, i) =>
            i === action.attributeIndex ? chosenRating : rating
          );
          return { ...el, ratings: ratings };
        } else {
          return el;
        }
      }),
    };
  } else if (action.type === "addScores") {
    return {
      ...state,
      choices: [...state.choices].map((el, i) => {
        let scoreToAdd;
        for (const score of action.value) {
          let indexOfScore: number;
          if (typeof action.value !== "string" && typeof score === "number") {
            indexOfScore = action.value.indexOf(score);
            if (i === indexOfScore) {
              scoreToAdd = score;
            }
          }
        }
        return { ...el, score: scoreToAdd };
      }),
    };
  } else {
    // throw new Error("Unknown action type: " + action.type);
    return state;
  }
}

export default function DecisionMaker() {
  const initialState = {
    choices: [
      {
        choiceName: "",
        ratings: [undefined, undefined, undefined],
        score: undefined,
      },
      {
        choiceName: "",
        ratings: [undefined, undefined, undefined],
        score: undefined,
      },
      {
        choiceName: "",
        ratings: [undefined, undefined, undefined],
        score: undefined,
      },
    ],
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
    winner: undefined,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function handleFindTheWinner() {
    function calculateScores() {
      const output = [];
      const weights = getWeights(state.attributes);
      console.log(weights);
      const arrOfRatings = getRatings(state.choices);
      console.log(arrOfRatings);
      for (const rating of arrOfRatings) {
        if (weights) {
          const total = calculateTotal(weights, rating);
          console.log(total);
          output.push(total);
        }
      }
      return output;
    }
    const arrayOfScores = calculateScores();
    const largestScore = arrayOfScores.sort((a, b) => a - b)[0];
    const indexOfLargestScore = arrayOfScores.indexOf(largestScore);
    const winner = state.choices.filter(
      (el: choiceValuesElement, i: number) => i === indexOfLargestScore
    )[0].choiceName;

    dispatch({ type: "addScores", value: arrayOfScores });
  }
  //   console.log(handleFindTheWinner());
  //placeholders: brownies, pizza, sandwhich
  console.log(state);
  return (
    <>
      <form>
        <fieldset>
          <legend>choices:</legend>
          {state.choices.map((el: choiceValuesElement, i: number) => (
            <input
              key={i}
              type="text"
              value={typeof el.choiceName === "string" ? el.choiceName : ""}
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
                value={
                  typeof el.attributeName === "string" ? el.attributeName : ""
                }
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
      {state.choices.map((el: choiceValuesElement, i: number) => (
        <ChoiceCard
          key={i}
          choiceIndex={i}
          attributes={state.attributes}
          choice={el}
          dispatch={dispatch}
        />
      ))}
      <button onClick={handleFindTheWinner}>Find the Winner</button>
      <p>Winner:</p>
    </>
  );
}

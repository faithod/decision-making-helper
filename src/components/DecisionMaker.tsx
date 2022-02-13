import { useReducer } from "react";
import { Action } from "../interfaces/Action";
import { AttributeElement } from "../interfaces/AttributeElement";
import { ChoiceValuesElement } from "../interfaces/ChoiceValuesElement";
import { DecisionState } from "../interfaces/DecisionState";
import calculateScores from "../utils/calculateScores";
import ChoiceCard from "./ChoiceCard";
import DeleteAndAddButtons from "./DeleteAndAddButtons";

function reducer(state: DecisionState, action: Action): DecisionState {
  let chosenWeight: number;
  let choiceElement: ChoiceValuesElement;
  let attributeElement: AttributeElement;
  switch (action.type) {
    case "insertChoice":
      return {
        ...state,
        choices: [...state.choices].map((el, i) =>
          i === action.index ? { ...el, choiceName: action.value } : el
        ),
      };
    case "insertAttribute":
      return {
        ...state,
        attributes: [...state.attributes].map((el, i) =>
          i === action.index ? { ...el, attributeName: action.value } : el
        ),
      };
    case "insertWeight":
      chosenWeight = parseInt(
        typeof action.value === "string" ? action.value : ""
      );
      return {
        ...state,
        attributes: [...state.attributes].map((el, i) =>
          i === action.index ? { ...el, weight: chosenWeight } : el
        ),
      };
    case "insertRating":
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
    case "insertScores":
      return {
        ...state,
        choices: [...state.choices].map((el, i) => {
          let scoreToAdd;
          if (typeof action.value === "object") {
            for (const score of action.value) {
              const indexOfScore = action.value.indexOf(score);
              if (i === indexOfScore) {
                scoreToAdd = score;
              }
            }
          }
          console.log(scoreToAdd);
          return { ...el, score: scoreToAdd };
        }),
      };
    case "insertWinner":
      return {
        ...state,
        winner: typeof action.value === "string" ? action.value : "",
      };
    case "addChoice":
      //element to add to choice state
      choiceElement = {
        choiceName: "",
        ratings: [undefined, undefined, undefined],
        score: undefined,
      };
      return { ...state, choices: [...state.choices, choiceElement] };
    case "addAttribute":
      //element to add to attribute state
      attributeElement = {
        attributeName: "",
        weight: undefined,
      };
      return {
        ...state,
        attributes: [...state.attributes, attributeElement],
        choices: [...state.choices].map((el) => {
          //ratings array should increase and decrease with the number of attributes
          return { ...el, ratings: [...el.ratings, undefined] };
        }),
      };
    case "deleteChoice":
      return { ...state, choices: [...state.choices].slice(0, -1) };
    case "deleteAttribute":
      return {
        ...state,
        attributes: [...state.attributes].slice(0, -1),
        choices: [...state.choices].map((el) => {
          //ratings array should increase and decrease with the number of attributes
          return { ...el, ratings: [...el.ratings].slice(0, -1) };
        }),
      };
    default:
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
    const arrayOfScores = calculateScores(state.attributes, state.choices);
    const largestScore = [...arrayOfScores].sort((a, b) => b - a)[0];
    const indexOfLargestScore = arrayOfScores.indexOf(largestScore);
    const winner = state.choices.filter(
      (el: ChoiceValuesElement, i: number) => i === indexOfLargestScore
    )[0].choiceName;

    dispatch({ type: "insertScores", value: arrayOfScores });
    dispatch({ type: "insertWinner", value: winner });
  }

  //placeholders: brownies, pizza, sandwhich
  console.log(state);
  return (
    <>
      <form>
        <fieldset>
          <legend>choices:</legend>
          {state.choices.map((el: ChoiceValuesElement, i: number) => (
            <input
              key={i}
              type="text"
              value={typeof el.choiceName === "string" ? el.choiceName : ""}
              onChange={(e) =>
                dispatch({
                  type: "insertChoice",
                  value: e.target.value,
                  index: i,
                })
              }
            ></input>
          ))}
          <DeleteAndAddButtons type={"Choice"} dispatch={dispatch} />
        </fieldset>
        <fieldset>
          <legend>attributes and relative importance:</legend>
          {state.attributes.map((el: AttributeElement, i: number) => (
            <div key={i}>
              <input
                type="text"
                value={
                  typeof el.attributeName === "string" ? el.attributeName : ""
                }
                onChange={(e) =>
                  dispatch({
                    type: "insertAttribute",
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
                    type: "insertWeight",
                    value: e.target.value,
                    index: i,
                  })
                }
              >
                <option value="">select one</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          ))}
          <DeleteAndAddButtons type={"Attribute"} dispatch={dispatch} />
        </fieldset>
      </form>
      {state.choices.map((el: ChoiceValuesElement, i: number) => (
        <ChoiceCard
          key={i}
          choiceIndex={i}
          attributes={state.attributes}
          choice={el}
          dispatch={dispatch}
        />
      ))}
      <button onClick={handleFindTheWinner}>Find the Winner</button>
      <p>Winner: {state.winner}</p>
    </>
  );
}

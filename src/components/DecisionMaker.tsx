import { useReducer } from "react";
import { Action } from "../interfaces/Action";
import { AttributeElement } from "../interfaces/AttributeElement";
import { ChoiceValuesElement } from "../interfaces/ChoiceValuesElement";
import { DecisionState } from "../interfaces/DecisionState";
import calculateScores from "../utils/calculateScores";
import ChoiceCard from "./ChoiceCard";
import DeleteAndAddButtons from "./DeleteAndAddButtons";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Choices from "./Choices";
import { Item } from "../Item";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";

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
          console.log(action.value);
          let scoreToAdd;
          if (Array.isArray(action.value)) {
            const copyOfActionValue = [...action.value];
            for (const score of action.value) {
              //so that we always get the right index if we have duplicate values
              const indexOfScore = copyOfActionValue.indexOf(score);
              copyOfActionValue.splice(indexOfScore, 1, "removed");
              console.log(indexOfScore);
              if (i === indexOfScore) {
                console.log(indexOfScore, i, score);
                scoreToAdd = score;
              }
            }
          }
          // console.log(scoreToAdd);
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
    console.log(arrayOfScores);
    const largestScore = [...arrayOfScores].sort((a, b) => b - a)[0];
    const indexOfLargestScore = arrayOfScores.indexOf(largestScore);
    const winner = state.choices.filter(
      (el: ChoiceValuesElement, i: number) => i === indexOfLargestScore
    )[0].choiceName;

    console.log(arrayOfScores);
    dispatch({ type: "insertScores", value: arrayOfScores });
    dispatch({ type: "insertWinner", value: winner });
  }

  //placeholders: brownies, pizza, sandwhich
  console.log(state);
  return (
    <>
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 1,
            m: 4,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Choices choices={state.choices} dispatch={dispatch} />
            <Grid item xs={12}>
              <Item sx={{ bgcolor: "#fce9ef" }}>
                <form>
                  <fieldset>
                    <legend>attributes and relative importance:</legend>
                    {state.attributes.map((el: AttributeElement, i: number) => (
                      <div key={i}>
                        <TextField
                          size="small"
                          sx={{ m: 1 }}
                          type="text"
                          value={
                            typeof el.attributeName === "string"
                              ? el.attributeName
                              : ""
                          }
                          onChange={(e) =>
                            dispatch({
                              type: "insertAttribute",
                              value: e.target.value,
                              index: i,
                            })
                          }
                        ></TextField>
                        <FormControl>
                          <Select
                            size="small"
                            sx={{ mt: 1 }}
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
                            <MenuItem value="">select one</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    ))}
                    <DeleteAndAddButtons
                      type={"Attribute"}
                      dispatch={dispatch}
                    />
                  </fieldset>
                </form>
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item sx={{ bgcolor: "#fce9ef" }}>
                <Box sx={{ display: "flex" }}>
                  {state.choices.map((el: ChoiceValuesElement, i: number) => (
                    <ChoiceCard
                      key={i}
                      choiceIndex={i}
                      attributes={state.attributes}
                      choice={el}
                      dispatch={dispatch}
                    />
                  ))}
                </Box>
                <Button
                  variant="outlined"
                  sx={{ color: "default" }}
                  onClick={handleFindTheWinner}
                >
                  Find the Winner
                </Button>
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item sx={{ bgcolor: "#fce9ef" }}>
                <p>Winner: {state.winner}</p>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}

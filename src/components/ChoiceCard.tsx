import { AttributeElement } from "../interfaces/AttributeElement";
import { Action } from "../interfaces/Action";
import { ChoiceValuesElement } from "../interfaces/ChoiceValuesElement";

export default function ChoiceCard(props: {
  choiceIndex: number;
  attributes: AttributeElement[];
  choice: ChoiceValuesElement;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <>
      <h3>{props.choice.choiceName}</h3>
      {props.attributes.map((el, i) => (
        <div key={i}>
          <label htmlFor="attribute-scores">{el.attributeName}:</label>

          <select
            id="attribute-scores"
            onChange={(e) =>
              props.dispatch({
                type: "addRating",
                value: e.target.value,
                index: props.choiceIndex,
                attributeIndex: i,
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
      <p>Score: {props.choice.score}</p>
    </>
  );
}

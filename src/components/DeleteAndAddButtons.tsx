import { Action } from "../interfaces/Action";

export default function DeleteAndAddButtons(props: {
  type: string;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          props.dispatch({ type: "delete" + props.type });
        }}
      >
        Delete
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          props.dispatch({ type: "add" + props.type });
        }}
      >
        Add
      </button>
    </>
  );
}

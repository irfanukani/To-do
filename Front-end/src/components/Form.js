import React from "react";

export default function Form({
  inputValue,
  setInputValue,
  HandleInsertion,
  loading,
}) {
  return (
    <div class='container d-flex'>
      <input
        class='form-control m-2'
        value={inputValue}
        placeholder='Todo here... '
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      ></input>
      <button
        class='btn btn-outline-warning m-2'
        onClick={() => {
          HandleInsertion();
        }}
      >
        {loading ? "ADDING" : "ADD"}
      </button>
    </div>
  );
}

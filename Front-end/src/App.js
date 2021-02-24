import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Form from "./components/Form";
import axios from "axios";

const DisplayTodo = ({ TODOS, DeleteTodo, UpdateTodo }) => {
  const data = TODOS;
  const listData = data.map((element) => {
    return (
      <li key={element.id} className=' d-flex justify-content-between mt-2'>
        {element.task}{" "}
        <div>
          <button
            className='btn btn-warning mr-5'
            onClick={() => {
              UpdateTodo(element.id);
            }}
          >
            {" "}
            UPDATE
          </button>
          <button
            className='btn btn-danger'
            onClick={() => {
              DeleteTodo(element.id);
            }}
          >
            {" "}
            DELETE
          </button>
        </div>
      </li>
    );
  });
  return <ul>{listData}</ul>;
};

const Validate = (props) => {
  if (props.toString() === "") {
    console.log(props);
    alert("Please Provide a todo");
    return false;
  } else return true;
};

function App() {
  const [inputValue, SetinputValue] = useState("");
  const [Todo, SetTodo] = useState([]);
  const [loading, SetLoading] = useState(true);

  const _FetchTodos = async () => {
    const { status, data } = await axios.get("http://127.0.0.1:1337/");
    if (status === 200) {
      SetTodo(data);
      SetLoading(false);
    }
  };

  useEffect(() => {
    _FetchTodos();
  }, []);

  const _DeleteTodo = async (myId) => {
    const { status } = await axios.post("http://127.0.0.1:1337/delete", {
      deleteId: myId,
    });
    console.log("call :" + typeof myId);
    if (status === 200) {
      _FetchTodos();
      SetLoading(false);
    }
  };

  const _UpdateTodo = async (myId) => {
    const newTask = prompt("Update Task");

    const { status } = await axios.put("http://127.0.0.1:1337/", {
      id: myId,
      updatedTask: newTask,
    });

    if (status === 200) {
      _FetchTodos();
      SetLoading(false);
    }
  };

  const HandleInsertion = async () => {
    if (Validate(inputValue) === true) {
      axios
        .post("http://127.0.0.1:1337/", { id: uuidv4(), task: inputValue })
        .then((res) => {
          if (res.status === 200) {
            console.log("doneee");
            SetinputValue("");
            _FetchTodos();
          }
        });
    }
  };

  return (
    <div class='container mt-5'>
      <Form
        inputValue={inputValue}
        setInputValue={SetinputValue}
        HandleInsertion={HandleInsertion}
        loading={loading}
      />
      <div className='mt-5'>
        <DisplayTodo
          TODOS={Todo}
          DeleteTodo={_DeleteTodo}
          UpdateTodo={_UpdateTodo}
        />
      </div>
    </div>
  );
}

export default App;

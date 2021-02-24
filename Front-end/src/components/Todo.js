import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayTodo = (props) => {
  const data = props.TODOS;
  const listData = data.map((element) => {
    return <li key={element.id}>{element.task}</li>;
  });
  return <ul>{listData}</ul>;
};

export default function Todo() {
  const [Todo, SetTodo] = useState([]);
  const [loading, SetLoading] = useState(true);

  const _FetchTodos = async () => {
    axios.get("http://127.0.0.1:1337/").then((res) => {
      SetTodo(res.data);
      SetLoading(false);
    });
  };

  useEffect(() => {
    _FetchTodos();
  }, []);

  if (loading !== true) {
    return (
      <div className='container'>
        <DisplayTodo TODOS={Todo} />
      </div>
    );
  } else {
    return (
      <div className='container d-flex justify-content-center mt-5'>
        <div class='spinner-border text-warning ' role='status'>
          <span class='sr-only'>Loading...</span>
        </div>
      </div>
    );
  }
}

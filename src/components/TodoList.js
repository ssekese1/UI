import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from '../img/todo.svg';
import deleteicon from '../img/delete.svg';

const TodoList = () => {
    const [Todos, setTodo] = useState([]);
    const [input, setInput] = useState("");
    const HandleChange = async (e) => {
        setInput(e.target.value);
    }
    useEffect(() => {
        listTodos();
    }, []);
    const CheckBoxChange = async (e)=> {
        const { value, checked } = e.target;
        if (checked) {
          completeTodo(value);
        } else {
          UncompleteTodo(value);
        }
      }
    
    const listTodos = async () => {
        const response = await axios.get("http://localhost:8080");
        setTodo(response.data);
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/${id}`);
            listTodos();
        } catch (error) {
            console.log(error);
        }
    };
    const saveTodo = async (e) => {
        try {
            await axios.post("http://localhost:8080", {
                title: input,
            });
            setInput("");
            listTodos();
        } catch (error) {
            console.log(error);
        }
    };
    const completeTodo = async (id) => {
        try {
            await axios.patch(`http://localhost:8080/${id}`, {
                isDone: true,
            });
            listTodos();
        } catch (error) {
            console.log(error);
        }
    };
    
    const UncompleteTodo = async (id) => {
        try {
           await axios.patch(`http://localhost:8080/${id}`, {
                isDone: false,
            });
            listTodos();
        } catch (error) {
            console.log(error);
        }
    };

    const listCompleted = async () => {
        const response = await axios.get("http://localhost:8080");
        const data = response.data.filter(todo => todo.isDone === true);
        setTodo(data);
    };

    const listUnCompleted = async () => {
        const response = await axios.get("http://localhost:8080");
        const data = response.data.filter(todo => todo.isDone === false);
        setTodo(data);
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            console.log("enter pressd");
            saveTodo();
        }
      };

    return (
    <div className="Todos---Web">
    <div className="Rectangle">
    <div>
        <img src={logo} className="Group" alt="list logo"/>
    </div>
    <div>
        <span className="Todo-List Text-Style">Todo List</span>
    </div>
        <input 
        type="text"
        placeholder="Add a new todo"
        value={input}
        name="text"
        className="Add-a-new-todo"
        onChange={HandleChange}
        onKeyDown={handleKeyDown}
        />
        <div className="Line-Copy"></div>
        <div>
        <table>
                <tbody>
                    { Todos.map((todo, index) => (
                        <tr key={ todo.id } className="Make-a-todo-list">
                            <td><input
                                defaultChecked={todo.isDone}
                                onChange={CheckBoxChange}
                                type="checkbox"
                                value={todo.id} 
                                className="rectangle"/> <span></span>{ todo.title }
                            </td>
                            <td>
                                <img src={deleteicon} className="Path-Copy" alt="delete" onClick={ () => deleteTodo(todo.id) } />
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
        <div>
            Show:
            <Link onClick={listTodos} to="/">
            <span className="All">All</span>
            </Link>
            <Link onClick={listCompleted} to="/">
            <span className="Completed">Completed</span>
            </Link>
            <Link onClick={listUnCompleted} to="/">
            <span className="Incompleted">Incompleted</span>
            </Link>
        </div>
    </div>
    </div>
    );
};

export default TodoList;
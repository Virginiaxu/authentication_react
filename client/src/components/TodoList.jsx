import React from "react";
import PropTypes from "prop-types";
import Auth from '../modules/Auth';
import TodoItem from "./TodoItem.jsx";

class TodoList extends React.Component {
    constructor(props){
        super(props)
    }
  render() {
    const todoList = this.props.todoList;
    //const { handleClick, handleDelete, handleUpdate} = this.props;
    return (
      <div className="row">
        <div className="col-sm-4 col-sm-offset-4">
          {todoList.map((todo, index) => 
            <TodoItem key={index} 
                      index={index}
                      handleClick={this.props.handleClick} 
                      handleUpdate={this.props.handleUpdate}
                      handleDelete={this.props.handleDelete} 
                      text={todo.text}
                      done={todo.done}/>
                       )}
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
    todoList: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}

export default TodoList;
import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import TodoForm from "../components/TodoForm.jsx";
import TodoList from "../components/TodoList.jsx";
import superagent from "superagent";
class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      todoList:[],
      username: Auth.getUserName()
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const id = Auth.getUserId();
    superagent.get(`/api/dashboard/${id}`)
        //.set('Content-type', "application/x-www-form-urlencoded")
        .set('Authorization', `bearer ${Auth.getToken()}`)
        .end((err, res) => {
        if (err) return console.error(err);
        this.setState({
          todoList: res.body,
        });
      });
  }
  
  loadData(){
    console.log("executing update")
    const id = Auth.getUserId();
    superagent.get(`/api/dashboard/${id}`)
        //.set('Content-type', "application/x-www-form-urlencoded")
        .set('Authorization', `bearer ${Auth.getToken()}`)
        .end((err, res) => {
        if (err) return console.error(err);
        this.setState({
          todoList: res.body,
        });
      });
  }
    /*const xhr = new XMLHttpRequest();
    xhr.open('get', `/api/dashboard/${id}`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = "json";
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        //const todos = xhr.response.todos;
        //this.state.todoList = todos.map(todo => {todo.toObject()});
        this.setState({
          todoList:xhr.response.body
        });
        console.log("in dashboard "+todoList)
      }
    });
    xhr.send();*/
  

  /*handleClick(index) {
    const id = Auth.getUserId();
    const todoList = this.state.todoList;
    if (index < 0 || index > todoList.length) {
      console.error('index out of bounds');
    } else {
      todoList[index].done = !todoList[index].done;
      this.setState({ todoList });
      const xhr = new XMLHttpRequest();
      xhr.open('put', `/api/dashboard/${id}`);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
         console.log(xhr.response.todos);
        }
        console.log("error!")
      });
      const todoId = encodeURIComponent(todoList[index]._id);
      const todoText = encodeURIComponent(todoList[index].text);
      const todoDone = encodeURIComponent(todoList[index].done);
      const formData = `id=${todoId}&text=${todoText}&done=${todoDone}`;
      xhr.send(formData);
    }
  }*/
    updateTodoList(todoList) {
        this.setState({ todoList });
    }

    handleClick(index) {
      const id = Auth.getUserId();
      const todoList = this.state.todoList;
      if (index < 0 || index > todoList.length) {
        console.error('index out of bounds');
      } else {
        todoList[index].done = !todoList[index].done;
        console.log("the finished state is "+ todoList[index].done);
        
        this.setState({ todoList });
        const todoText = encodeURIComponent(todoList[index].text);
        const todoDone = encodeURIComponent(todoList[index].done);
        const todoId = encodeURIComponent(todoList[index]._id);
        console.log("id is "+ todoId);
        const formData = `id=${todoId}&text=${todoText}&done=${todoDone}`;
        
        superagent.put(`/api/dashboard/${id}`)
          .set('Content-type', "application/x-www-form-urlencoded")
          .set('Authorization', `bearer ${Auth.getToken()}`)
          .send(formData)
          .end((err, res) => {
            if (err) return console.error(err);
            //console.log(res.body);
          });
          this.loadData();
      }
  }

  handleDelete(index) {
    const id = Auth.getUserId();
    console.log("BIG "+index);
    const todoList = this.state.todoList;
    if (index < 0 || index > todoList.length) {
      console.error('index out of bounds');
    } else {
      const todo = todoList[index];
      superagent.delete(`/api/dashboard/${todo._id}`)
        .set('Authorization', `bearer ${Auth.getToken()}`)
        .end((err, res) => {
          if (err) console.error(err);
          console.log("deleted is "+ res)
        });
      this.loadData();
    }
  }

   handleUpdate(index, text) {
    const id = Auth.getUserId();
    const todoList = this.state.todoList;
    if (index < 0 || index > todoList.length) {
      console.error('index out of bounds');
    } else {
      todoList[index].text = text;
      this.setState({ todoList });

      const todoText = encodeURIComponent(todoList[index].text);
      const todoDone = encodeURIComponent(todoList[index].done);
      const todoId = encodeURIComponent(todoList[index]._id);
      const formData = `id=${todoId}&text=${todoText}&done=${todoDone}`;
   
      
      superagent.put(`/api/dashboard/${id}`)
        .set('Authorization', `bearer ${Auth.getToken()}`)
        .set('Content-type', "application/x-www-form-urlencoded")
        .send(formData)
        .end((err,res) => {
          if (err) return console.error(err);
          console.log(res.body);
          //this.setState({ todoList: res.body });
        });
      this.loadData.bind();
    }
  }
  /**
   * Render the component.
   */
  render() {
    return(
      <div>
        <Dashboard todoList={this.state.todoList}
               username= {this.state.username}/>
        <TodoForm todoList={this.state.todoList}
                  loadData={this.loadData.bind(this)}
                  updateTodoList={this.updateTodoList.bind(this)}
        />
        <TodoList todoList={this.state.todoList}
                  handleClick={this.handleClick.bind(this)}
                  handleUpdate={this.handleUpdate.bind(this)}
                  handleDelete={this.handleDelete.bind(this)}
        /> 
     </div>
    )
  }
}

export default DashboardPage;

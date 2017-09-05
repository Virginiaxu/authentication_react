import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import superagent from "superagent";

class TodoForm extends React.Component{
    constructor(props){
        super(props);
    }
   
    handleSubmit(event) {
        const id = Auth.getUserId();
        event.preventDefault();   
        const todo = { text: this.refs.text.value};
        var text = 'text='+encodeURIComponent(this.refs.text.value);
        superagent.post(`/api/dashboard/${id}`)
        .set('Content-type', "application/x-www-form-urlencoded")
        .set('Authorization', `bearer ${Auth.getToken()}`)
        .set('Accept',"application/json")
        .send(text)
        .end((err, res) => {
            if (err) return console.error(err);
            
            //const newTodo = res.body;
            //this.props.todoList.push(newTodo);
            //this.props.updateTodoList(res.body);
            //console.log("inside the todoform " + res.body);
        });
        this.refs.text.value = '';
        this.props.loadData();
        console.log("form todos is "+ this.props.todoList)
    }

    render(){
        return(   
        <div className="row">
            <div className="col-sm-8 col-sm-offset-2 text-center">
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control input-lg text-center" ref="text"
                        autoFocus placeholder="text..."/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg"
                    onClick={this.handleSubmit.bind(this)}>Add</button>
                 </form>
            </div>
        </div>
        )
    }

};

TodoForm.propTypes={
    todoList: PropTypes.array.isRequired,
    loadData: PropTypes.func.isRequired
}


export default TodoForm;
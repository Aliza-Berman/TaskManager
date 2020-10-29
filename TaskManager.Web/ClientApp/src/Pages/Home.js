import React, { Component } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { UserContext } from '../UserContext';
import TaskRow from '../components/TaskRow';

export class Home extends Component {
    static displayName = Home.name;

    state = {
        connection: null,
        taskTitle: '',
        tasks: []

    }

    componentDidMount = async () => {
        const connection = new HubConnectionBuilder()
            .withUrl("/tasksHub").build();

        await connection.start();

        connection.invoke("GetAll");
        connection.on('AllTasks', tasks =>
            this.setState({ tasks }));

        this.setState({ connection });
    }
    onAddTaskClick = async () => {
        const { connection } = this.state;
        await connection.invoke("NewTask", this.state.taskTitle);
        this.setState({ taskTitle: '' });
    }
    onTakenClick = id => {
        const { connection } = this.state;
        connection.invoke("MarkTaken", id);
    }
    onCompleteClick = id => {
        const { connection } = this.state;
        connection.invoke("MarkComplete", id);
    }
    render() {
        return (
            <UserContext.Consumer>
                {value => {
                    const { user } = value;
                    return (<div>
                        <div className="input-group mb-3">
                            <input type="text"
                                placeholder="Task Title"
                                className="form-control"
                                onChange={e => this.setState({ taskTitle: e.target.value })}
                                value={this.state.taskTitle}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary " onClick={this.onAddTaskClick}>Add Task</button>
                            </div>
                        </div>
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tasks.map((task) => <TaskRow key={task.id}
                                    task={task}
                                    user={user}
                                    onTakenClick={this.onTakenClick}
                                    onCompleteClick={this.onCompleteClick}
                                />)}
                            </tbody>
                        </table>

                    </div>)
                }}
                    </UserContext.Consumer>

        );
    }
}

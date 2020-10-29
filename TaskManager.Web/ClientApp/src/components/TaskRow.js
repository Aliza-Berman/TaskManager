

import React from 'react';

const TaskRow = ({ user, task, onTakenClick, onCompleteClick }) => {
    const { undertakenBy } = task;
    return (
        <tr>
            <td>{task.title}</td>
            <td>
                {undertakenBy == null && <button className='btn btn-info doing' onClick={() => onTakenClick(task.id)}>I'm doing this one!</button>}

                {(undertakenBy != null && undertakenBy === user.id) &&
                    <button className='btn btn-success' onClick={() => onCompleteClick(task.id)}>I'm done!</button>
                }

                {(undertakenBy != null && undertakenBy !== user.id) &&
                    <button className='btn btn-danger' disabled> {task.responder} is doing this </button>
                }
            </td>
        </tr >
    );
}

export default TaskRow;


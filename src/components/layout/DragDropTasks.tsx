'use client';

import {
  DragDropContext,
  Droppable,
  DropResult,
  DraggableLocation,
  Draggable,
} from 'react-beautiful-dnd';
import { Task, TaskStatus } from '@prisma/client';
import { Card, CardContent, CardHeader } from '../ui/card';
import { useCallback, useState } from 'react';

type DragDropTasksProps = {
  tasks: Task[];
};

const TASKS_STATUS = [
  'BACKLOG',
  'PLANNING',
  'IN_PROGRESS',
  'PAUSED',
  'COMPLETED',
  'CANCELLED',
];

const DragDropTasks = ({ tasks }: DragDropTasksProps) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;
      console.log(source, destination);

      // If there's no destination, return early
      if (!destination) return;

      // If the item was dropped in the same place, return early
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      // Find the task that was dragged
      const draggedTask = taskList[source.index];

      // Create a new task list without the dragged task
      const updatedTaskList = Array.from(taskList);
      updatedTaskList.splice(source.index, 1);

      // Update the task's status and insert it at the new location
      const updatedTask = { ...draggedTask, status: destination.droppableId };
      updatedTaskList.splice(destination.index, 0, updatedTask as Task);

      // Update the state with the new task list
      setTaskList(updatedTaskList);
    },
    [taskList]
  );

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='w-full flex items-baseline justify-between gap-4'>
          {TASKS_STATUS.map((status, index) => (
            <Droppable
              key={status}
              droppableId={status}
              type={status}
              direction='vertical'>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey',
                    padding: '8px',
                    minHeight: '400px',
                    width: '250px',
                    borderRadius: '4px',
                  }}
                  {...provided.droppableProps}>
                  <h3>{status}</h3>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}>
                        {(provided, snapshot) => (
                          <Card
                            className='hover:cursor-grab'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              padding: '8px',
                              margin: '0 0 8px 0',
                              backgroundColor: snapshot.isDragging
                                ? 'lightgreen'
                                : 'white',
                              border: '1px solid lightgrey',
                              borderRadius: '4px',
                              ...provided.draggableProps.style,
                            }}>
                            <CardHeader>
                              <h4>{task.name}</h4>
                            </CardHeader>
                            <CardContent>
                              <p>{task.status}</p>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default DragDropTasks;

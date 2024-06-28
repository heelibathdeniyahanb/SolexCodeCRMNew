
import { useEffect, useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import React from "react";
import axios from "axios";
import WonKanbanBoard from "./WonKanbanBoard";
import LossKanbanBoard from "./LossKanbanBoard";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function KanbanBoard() {
  const [showWonBoard, setShowWonBoard] = useState(false);
  const [showLostBoard, setShowLostBoard] = useState(false);
  const [wonTasks, setWonTasks] = useState([]);
  const [lostTasks, setLostTasks] = useState([]);

  //Handle Delete Task
  const handleDeleteTask = (taskId, leadStatus) => {
    if (leadStatus === "won") {
      setShowWonBoard(true);
      setWonTasks((prevTasks) => [...prevTasks, taskId]);
      toast.success("Lead moved to Won board successfully!");
    } else if (leadStatus === "lost") {
      setShowLostBoard(true);
      setLostTasks((prevTasks) => [...prevTasks, taskId]);
      toast.success("Lead moved to Lost board successfully!");
    }
  };
  

  const defaultCols = [
    { id: "Planning", title: "Planning" },
    { id: "Qualification", title: "Qualification" },
    { id: "Proposal", title: "Proposal" },
    { id: "Negotiation", title: "Negotiation" },
    { id: "Close-won", title: "Close-won" },
  ];

  const defaultTasks = [
    { id: "1", columnId: "todo", content: "test1" },
    { id: "2", columnId: "done", content: "test2" },
  ];

  const [columns, setColumns] = useState(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [tasks, setTasks] = useState(defaultTasks);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:7143/api/Lead`)
      .then((response) => {
        const taskData = response.data;
        console.log(taskData);

        const formatData = taskData.map((data) => ({
          ...data,
          columnId: data.salesPipeline,
        }));
        console.log("DATA", formatData);
        setTasks(formatData);
      })
      .catch(() => console.log("error has occurred"));
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id, content) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  }

  function deleteColumn(id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  function updateColumn(id, title) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumns(newColumns);
  }

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          const updatedTask = tasks[activeIndex];
          updatedTask.columnId = tasks[overIndex].columnId;
          updateTaskPipeline(updatedTask.id, tasks[overIndex].columnId);
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const updatedTask = tasks[activeIndex];
        updatedTask.columnId = overId;
        updateTaskPipeline(updatedTask.id, overId);
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  const updateTaskPipeline = async (taskId, pipelineName) => {
    try {
      const response = await axios.put(
        `https://localhost:7143/api/Lead/UpdatePipeline/${taskId}/${pipelineName}`
      );
      console.log("Task pipeline updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating task pipeline:", error);
      toast.error("Failed to update task pipeline.");
    }
  };
  

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }

  return (
    <div className="-m-3 flex m-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px] -mt-2">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
        </div>
        

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                handleDeleteTask={handleDeleteTask}
                taskData={taskData}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      {showWonBoard && <WonKanbanBoard tasks={wonTasks} />}
      {showLostBoard && <LossKanbanBoard tasks={lostTasks} />}
    </div>
  );
}

export default KanbanBoard;

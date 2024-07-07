// KanbanBoard component
import React, { useEffect, useMemo, useState } from "react";
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
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WonKanbanBoard from "./WonKanbanBoard";
import LossKanbanBoard from "./LossKanbanBoard";

function KanbanBoard() {
  const [showWonBoard, setShowWonBoard] = useState(false);
  const [showLostBoard, setShowLostBoard] = useState(false);
  const [wonTasks, setWonTasks] = useState([]);
  const [lostTasks, setLostTasks] = useState([]);
  const [columns, setColumns] = useState([
    { id: "Planning", title: "Planning" },
    { id: "Qualification", title: "Qualification" },
    { id: "Proposal", title: "Proposal" },
    { id: "Negotiation", title: "Negotiation" },
    { id: "Close-won", title: "Close-won" },
  ]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:7143/api/Lead`)
      .then((response) => {
        const taskData = response.data;
        const formatData = taskData.map((data) => ({
          ...data,
          columnId: data.salesPipeline,
        })); 
        setTasks(formatData);
        console.log("Fetched tasks:", formatData);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to fetch tasks. Please try again later.");
      });
  }, []);
  

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  function deleteTask(id, leadStatus) {
    if (leadStatus === "won") {
      setShowWonBoard(true);
      setWonTasks((prevTasks) => [...prevTasks, id]);
      toast.success("Lead moved to Won board successfully!");
    } else if (leadStatus === "lost") {
      setShowLostBoard(true);
      setLostTasks((prevTasks) => [...prevTasks, id]);
      toast.success("Lead moved to Lost board successfully!");
    }
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

  async function updateTaskPipeline(taskId, pipelineName) {
    try {
      const response = await axios.put(
        `https://localhost:7143/api/Lead/UpdatePipeline/${taskId}/${pipelineName}`
      );
      console.log("Task pipeline updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating task pipeline:", error);
      toast.error("Failed to update task pipeline.");
    }
  }

  function onDragStart(event) {
    const { active } = event;
    if (active.data.current?.type === "Column") {
      setActiveColumn(active.data.current.column);
    }
    if (active.data.current?.type === "Task") {
      setActiveTask(active.data.current.task);
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
  
    setColumns((columns) => {
      const activeIndex = columns.findIndex((col) => col.id === activeId);
      const overIndex = columns.findIndex((col) => col.id === overId);
  
      return arrayMove(columns, activeIndex, overIndex);
    });
  
    if (active.data.current?.type === "Task") {
      const taskId = activeId;
      const pipelineName = overId;
      updateTaskPipeline(taskId, pipelineName);
    }
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

  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  function handleStatusUpdate(taskId, isWon) {
    const taskToMove = tasks.find(task => task.id === taskId);
    if (taskToMove) {
      if (isWon) {
        setWonTasks(prevTasks => [...prevTasks, taskToMove]);
      } else {
        setLostTasks(prevTasks => [...prevTasks, taskToMove]);
      }
      // Remove the task from the main board
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }
  }

  return (
    <div className="-m-3 flex m-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px] -mt-2">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <ToastContainer />
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columns.map((col) => col.id)}>
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
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      <WonKanbanBoard tasks={wonTasks} />
      <LossKanbanBoard tasks={lostTasks} />

    </div>
  );
}

export default KanbanBoard;

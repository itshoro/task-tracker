"use client";

import { type FormEvent, useRef, useState } from "react";
import { type TaskProps, taskFromInput, GenericTask } from "./task";

const TasksView = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitNewTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (inputRef.current?.value ?? "").trim();

    if (input) {
      setTasks((tasks) => [taskFromInput(input), ...tasks]);
    }
  };

  return (
    <>
      <form onSubmit={submitNewTask}>
        <input type="text" ref={inputRef} />
      </form>
      <ol>
        {tasks.map((task) => (
          <GenericTask key={task.id} {...task} />
        ))}
      </ol>
    </>
  );
};

export default TasksView;

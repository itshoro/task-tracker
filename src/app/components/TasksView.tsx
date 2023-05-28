"use client";

import { type FormEvent, useRef, useState } from "react";
import { type TaskProps, taskFromInput, GenericTask } from "./task";
import { useWindowEvent } from "@/hooks/useWindowEvent";
import { CumulativeTimer } from "./timer/CumulativeTimer";

const TasksView = () => {
  const focusedTask = useRef<number>();
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  const submitNewTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (inputRef.current?.value ?? "").trim();

    if (input) {
      setTasks((tasks) => {
        if (tasks.length > 0 && tasks[0].completedAt === undefined) {
          tasks[0].completedAt = Date.now();
        }
        return [taskFromInput(input), ...tasks];
      });
    }
  };

  function updateTask(task: TaskProps) {
    setTasks((tasks) => {
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks = [...tasks.slice(0, index), task, ...tasks.slice(index + 1)];
      return tasks;
    });
  }

  function next() {
    if (tasks.length === 0) return;

    focusedTask.current =
      focusedTask.current !== undefined
        ? Math.min(focusedTask.current + 1, tasks.length - 1)
        : 0;

    const targetElement = listRef.current!.children[
      focusedTask.current
    ] as HTMLLIElement;
    targetElement.focus();
  }

  function prev() {
    if (focusedTask.current === undefined) return;

    if (focusedTask.current === 0) {
      focusedTask.current = undefined;
      (document.activeElement as HTMLElement).blur();
      return;
    }

    focusedTask.current = Math.max(focusedTask.current - 1, 0);
    const targetElement = listRef.current!.children[
      focusedTask.current
    ] as HTMLLIElement;
    targetElement.focus();
  }

  useWindowEvent("keydown", (e) => {
    if (focusedTask.current === undefined) {
      inputRef.current!.focus();
    }

    switch (e.key) {
      case "Escape": {
        focusedTask.current = undefined;
        (document.activeElement as HTMLElement).blur();
        break;
      }
      case "ArrowDown": {
        next();
        break;
      }
      case "ArrowUp": {
        prev();
        break;
      }
      case "Home": {
        if (tasks.length === 0) break;
        focusedTask.current = 0;
        (listRef.current!.children[focusedTask.current] as HTMLElement).focus();
        break;
      }
      case "End": {
        if (tasks.length === 0) break;
        focusedTask.current = tasks.length - 1;
        (listRef.current!.children[focusedTask.current] as HTMLElement).focus();
        break;
      }
    }
  });

  return (
    <>
      <CumulativeTimer tasks={tasks} />
      <form onSubmit={submitNewTask}>
        <input autoFocus type="text" ref={inputRef} />
      </form>
      <ol
        ref={listRef}
        onBlur={(e) => {
          if (!listRef.current?.contains(e.relatedTarget)) {
            focusedTask.current = undefined;
          }
        }}
      >
        {tasks.map((task) => (
          <GenericTask key={task.id} task={task} onUpdateSelf={updateTask} />
        ))}
      </ol>
    </>
  );
};

export default TasksView;

"use client";

import { type FormEvent, useRef, useState, useEffect } from "react";
import { type TaskProps, taskFromInput, GenericTask } from "./task";
import { useWindowEvent } from "@/hooks/useWindowEvent";
import { CumulativeTimer } from "./timer/CumulativeTimer";
import { TaskInput } from "./TaskInput";
import usePersistedState from "@/hooks/usePersistedState";
import TaskEditDialog from "./dialog/TaskEditDialog";
import BreakTask from "./task/BreakTask";

const TasksView = () => {
  const focusedTask = useRef<number>();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialogTask, setDialogTask] = useState<TaskProps>();
  const [tasksPending, tasks, setTasks] = usePersistedState<TaskProps[]>(
    "persisted:tasks",
    []
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (!focusedTask.current || !listRef.current) return;
    setFocusedTask(Math.min(focusedTask.current, tasks.length - 1));
  }, [tasks]);

  function submitNewTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = (inputRef.current?.value ?? "").trim();

    if (input) {
      inputRef.current!.value = "";
      setTasks((tasks) => {
        if (tasks.length > 0 && tasks[0].completedAt === undefined) {
          tasks[0].completedAt = Date.now();
        }
        return [taskFromInput(input), ...tasks];
      });
    }
  }

  function setFocusedTask(index?: number) {
    if (typeof index === "number" && index < tasks.length && index >= 0) {
      focusedTask.current = index;
      (listRef.current?.children[focusedTask.current] as HTMLElement).focus();
    } else {
      focusedTask.current = undefined;
      (document.activeElement! as HTMLElement).blur();
    }
  }

  function openDialog(task: TaskProps) {
    setDialogTask(task);
    queueMicrotask(() => {
      dialogRef.current?.showModal();
    });
  }

  function next() {
    if (tasks.length === 0) setFocusedTask(undefined);
    else if (focusedTask.current === undefined) setFocusedTask(0);
    else setFocusedTask(Math.min(focusedTask.current + 1, tasks.length - 1));
  }

  function prev() {
    if (focusedTask.current === undefined) return;
    setFocusedTask(focusedTask.current - 1);
  }

  useWindowEvent("keydown", (e) => {
    if (dialogTask !== undefined) return;

    switch (e.key) {
      case "Escape": {
        if (focusedTask.current !== undefined) {
          setFocusedTask(undefined);
        } else if (inputRef.current && inputRef.current.value) {
          inputRef.current.value = "";
        } else {
          (document.activeElement as HTMLElement).blur();
        }
        break;
      }
      case "Delete": {
        if (focusedTask.current === undefined) return;

        e.preventDefault();
        setTasks((tasks) => [
          ...tasks.slice(0, focusedTask.current!),
          ...tasks.slice(focusedTask.current! + 1),
        ]);

        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        next();
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        prev();
        break;
      }
      case "Home": {
        e.preventDefault();
        setFocusedTask(0);
        break;
      }
      case "End": {
        e.preventDefault();
        setFocusedTask(tasks.length - 1);
        break;
      }
      default: {
        inputRef.current!.focus();
        break;
      }
    }
  });

  return (
    <>
      <section className="px-6">
        <div className="text-center py-8">
          <CumulativeTimer tasks={tasks} />
        </div>
        <form onSubmit={submitNewTask}>
          <TaskInput type="text" ref={inputRef} />
        </form>
      </section>
      {tasksPending ? (
        <TasksPending />
      ) : (
        <>
          <section className="overflow-y-scroll">
            <header className="sticky top-0 pointer-events-none z-40">
              <div className="text-sm font-medium text-stone-400 bg-stone-50 dark:bg-neutral-900 px-6">
                <div className="border-b dark:border-stone-700 flex justify-between pb-2">
                  <span>Task</span>
                  <span>Time Elapsed</span>
                </div>
              </div>
              <div className="absolute h-8 w-full bg-gradient-to-b from-stone-50 dark:from-neutral-900" />
            </header>
            <div className="fixed h-8 bottom-0 w-full bg-gradient-to-t from-stone-50 dark:from-neutral-900 pointer-events-none" />

            <ol
              className="py-8 px-6"
              ref={listRef}
              onBlur={(e) => {
                if (
                  dialogTask !== undefined ||
                  listRef.current?.contains(e.relatedTarget)
                )
                  // Keep track of the focused element, when we have the edit dialog
                  // open or if the focused element is part of this ol.
                  return;

                focusedTask.current = undefined;
              }}
            >
              {tasks.map((task, i) => {
                if (task.type === "break")
                  return (
                    <BreakTask
                      key={task.id}
                      task={task}
                      onClick={() => setFocusedTask(i)}
                    />
                  );
                return (
                  <GenericTask
                    key={task.id}
                    task={task}
                    onEdit={openDialog}
                    onClick={() => setFocusedTask(i)}
                  />
                );
              })}
            </ol>
          </section>

          {dialogTask && (
            <TaskEditDialog
              ref={dialogRef}
              task={dialogTask}
              onClose={() => {
                setDialogTask(undefined);
              }}
              onSubmit={(task) => {
                setDialogTask(undefined);
                setTasks((tasks) => {
                  const index = tasks.findIndex((t) => task.id === t.id);

                  return [
                    ...tasks.slice(0, index),
                    task,
                    ...tasks.slice(index + 1),
                  ];
                });
              }}
            />
          )}
        </>
      )}
    </>
  );
};

const TasksPending = () => {
  return (
    <div className="pt-24 px-6 pb-24 space-y-4 overflow-hidden">
      <div className="sr-only">Loading...</div>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="h-12 w-full rounded-xl bg-stone-800 animate-pulse"
          />
        ))}
    </div>
  );
};

export default TasksView;

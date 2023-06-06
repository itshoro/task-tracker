import {
  type ComponentPropsWithoutRef,
  useEffect,
  useState,
  useRef,
} from "react";
import type { TaskProps } from ".";
import { useSynchronizedInterval } from "@/hooks/useSynchronizedInterval";
import { format } from "date-fns";
import { TaskTimer } from "../timer/TaskTimer";

type GenericTaskProps = {
  task: TaskProps;
  onEdit: (task: TaskProps) => void;
} & ComponentPropsWithoutRef<"li">;

function useNowIfTaskPending(task: TaskProps) {
  const [now, setNow] = useState(
    task.completedAt ??
      (Date.now() < task.createdAt ? task.createdAt : Date.now())
  );
  const { subscribe } = useSynchronizedInterval();

  useEffect(() => {
    if (task.completedAt !== undefined) return;
    return subscribe((now) => setNow(now));
  }, [task.completedAt]);
  return now;
}

const GenericTask = ({ task, onEdit, ...props }: GenericTaskProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const now = useNowIfTaskPending(task);

  return (
    <li
      className="group outline-none my-0.5"
      tabIndex={-1}
      onKeyDown={(e) => {
        switch (e.key) {
          case "Enter":
            if (e.shiftKey) break;
            e.preventDefault();
            onEdit(task);
            break;
        }
      }}
      ref={ref}
      {...props}
    >
      <div className="-mx-2 px-2 py-3 rounded-lg group-focus:ring-2 ring-stone-600 text-stone-500">
        <div className="grid grid-cols-[auto,_minmax(0,_1fr),_auto] gap-4">
          <div className="flex gap-4">
            <span>{format(task.createdAt, "HH:mm")}</span>
            <span className="select-none">&middot;</span>
          </div>
          <span className="flex gap-2 text-white">{task.title}</span>
          <TaskTimer
            className={`ml-auto ${
              task.completedAt === undefined ? "text-white" : "text-stone-500"
            }`}
            ms={(task.completedAt ?? now) - task.createdAt}
          />
        </div>
        <Note note={task.note} />
      </div>
    </li>
  );
};

type NoteProps = {
  note?: string;
};
const Note = ({ note }: NoteProps) => {
  if (note === undefined) return null;

  return (
    <div className="relative rounded-xl bg-stone-950 p-4 text-stone-400 mt-6 -mx-2">
      <div className="absolute -top-3 left-4 h-6 w-6 rounded-tl-md bg-stone-950 rotate-45 -z-10" />
      <ul className="list-disc pl-6 marker:text-stone-700">
        {note
          .split(/[\-\*\n]/)
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            return <li key={line}>{line.trim()}</li>;
          })}
      </ul>
    </div>
  );
};

export default GenericTask;

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
      className="group outline-none"
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
      <div className="-mx-2 px-2 py-3 rounded-lg border-2 border-transparent group-focus:border-stone-600 text-stone-500">
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
        <div>{task.note}</div>
      </div>
    </li>
  );
};

export default GenericTask;

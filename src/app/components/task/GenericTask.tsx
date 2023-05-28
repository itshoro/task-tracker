import { type ComponentPropsWithoutRef, useEffect, useState } from "react";
import type { TaskProps } from ".";
import { useSynchronizedInterval } from "@/hooks/useSynchronizedInterval";
import { format } from "date-fns";
import { TaskTimer } from "../timer/TaskTimer";

type GenericTaskProps = { task: TaskProps } & ComponentPropsWithoutRef<"li">;

const GenericTask = ({ task, ...props }: GenericTaskProps) => {
  const [now, setNow] = useState(
    task.completedAt ??
      (Date.now() < task.createdAt ? task.createdAt : Date.now())
  );
  const { subscribe } = useSynchronizedInterval();

  useEffect(() => {
    if (task.completedAt !== undefined) return;
    return subscribe((now) => setNow(now));
  }, [task.completedAt]);

  return (
    <li tabIndex={-1} {...props}>
      <span>{format(task.createdAt, "HH:mm")}</span>
      <span className="select-none">&middot;</span>
      <span>{task.title}</span>
      <TaskTimer ms={(task.completedAt ?? now) - task.createdAt} />
    </li>
  );
};

export default GenericTask;

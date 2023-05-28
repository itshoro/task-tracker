import {
  type ComponentPropsWithoutRef,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import type { TaskProps } from ".";
import { useSynchronizedInterval } from "@/hooks/useSynchronizedInterval";
import { format } from "date-fns";
import { TaskTimer } from "../timer/TaskTimer";

type GenericTaskProps = {
  task: TaskProps;
  onUpdateSelf: (task: TaskProps) => void;
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

const GenericTask = ({ task, onUpdateSelf, ...props }: GenericTaskProps) => {
  const now = useNowIfTaskPending(task);

  const [editing, setEditing] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (editing) {
      queueMicrotask(() => {
        editorRef.current!.focus();
        editorRef.current!.selectionStart = editorRef.current!.value.length;
        editorRef.current!.selectionEnd = editorRef.current!.value.length;
      });
    }
  }, [editing]);

  return (
    <li
      className="group"
      tabIndex={-1}
      onKeyDown={(e) => {
        switch (e.key) {
          case "Escape":
            setEditing(false);
            break;
          case "Enter":
            if (e.shiftKey) break;
            e.preventDefault();

            setEditing((editing) => {
              if (
                editing &&
                editorRef.current &&
                editorRef.current.value !== task.note
              ) {
                onUpdateSelf({ ...task, note: editorRef.current.value });
              }
              return !editing;
            });
            break;
        }
      }}
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
          {editing ? (
            <textarea ref={editorRef} defaultValue={task.note} />
          ) : (
            task.note && <blockquote>{task.note}</blockquote>
          )}
        </div>
      </div>
    </li>
  );
};

export default GenericTask;

import { RefObject, forwardRef, useRef } from "react";
import { type TaskProps } from "../task";
import Dialog from "./Dialog";

type TaskEditDialogProps = {
  task: TaskProps;
  onSubmit: (task: TaskProps) => void;
  onClose: () => void;
  onCancel?: () => void;
};

const TaskEditDialog = forwardRef<HTMLDialogElement, TaskEditDialogProps>(
  ({ task, onSubmit, onClose, onCancel }, ref) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const noteRef = useRef<HTMLTextAreaElement>(null);

    return (
      <Dialog
        ref={ref}
        onSubmit={() => {
          onSubmit({
            ...task,
            title: titleRef.current!.value.trim(),
            note: noteRef.current!.value.trim() || undefined,
          } satisfies TaskProps);
          (ref as RefObject<HTMLDialogElement>).current!.close();
        }}
        onCancel={() => {
          if (typeof onCancel === "function") onCancel();
          (ref as RefObject<HTMLDialogElement>).current!.close();
        }}
        onClose={onClose}
      >
        <div className="grid gap-6">
          <label>
            <div className="mb-2">Title</div>
            <div className="rounded-xl bg-white dark:bg-neutral-800 shadow transition ring-offset-neutral-900 focus-within:ring-2 ring-stone-700 dark:ring-stone-700 ring-offset-2 relative flex-1">
              <input
                tabIndex={0}
                placeholder="Add a task..."
                spellCheck="false"
                autoComplete="off"
                aria-autocomplete="both"
                className="block rounded-xl w-full p-2 outline-none bg-transparent dark:text-stone-400 dark:placeholder-stone-600"
                defaultValue={task.title}
                ref={titleRef}
                autoFocus={true}
                required={true}
                type="text"
              />
            </div>
          </label>
          <label>
            <div className="mb-2">Note</div>
            <div className="rounded-xl bg-white dark:bg-neutral-800 shadow transition ring-offset-neutral-900 focus-within:ring-2 ring-stone-700 dark:ring-stone-700 ring-offset-2 relative flex-1">
              <textarea
                rows={4}
                name="note"
                className="block rounded-xl w-full p-2 outline-none bg-transparent dark:text-stone-400 dark:placeholder-stone-600"
                defaultValue={task.note}
                ref={noteRef}
              ></textarea>
            </div>
          </label>
        </div>
      </Dialog>
    );
  }
);

export default TaskEditDialog;

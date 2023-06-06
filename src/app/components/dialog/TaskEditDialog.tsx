import { RefObject, forwardRef } from "react";
import { type TaskProps } from "../task";
import Dialog from "./Dialog";
import { format } from "date-fns";

type TaskEditDialogProps = {
  task: TaskProps;
  onSubmit: (task: TaskProps) => void;
  onClose: () => void;
  onCancel?: () => void;
};

const requiredFormValues = ["title", "createdAt"];
function validateTask(formData: FormData) {
  if (
    !requiredFormValues.every(
      (name) => formData.has(name) && typeof name === "string"
    )
  ) {
    throw new Error("Required value is missing or in an unsupported format.");
  }

  if (Number.isNaN(Date.parse(formData.get("createdAt") as string)))
    throw new Error("createdAt is in an unsupported format.");
}

const TaskEditDialog = forwardRef<HTMLDialogElement, TaskEditDialogProps>(
  ({ task, onSubmit, onClose, onCancel }, ref) => {
    return (
      <Dialog
        ref={ref}
        onSubmit={(e) => {
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);

          try {
            validateTask(formData);
          } catch {
            return;
          }

          const createdAt = Date.parse(formData.get("createdAt") as string);
          const completedAt =
            formData.get("completedAt") !== ""
              ? Date.parse(formData.get("completedAt") as string)
              : undefined;

          onSubmit({
            ...task,
            title: (formData.get("title") as string).trim(),
            note: (formData.get("note") as string | null)?.trim() || undefined,
            createdAt,
            completedAt,
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
                autoFocus={true}
                required={true}
                name="title"
                type="text"
              />
            </div>
          </label>
          <label>
            <div className="mb-2">Created at</div>

            <div className="flex gap-2">
              <div className="inline-block rounded-xl bg-white dark:bg-neutral-800 shadow transition ring-offset-neutral-900 focus-within:ring-2 ring-stone-700 dark:ring-stone-700 ring-offset-2 relative flex-1">
                <input
                  type="datetime-local"
                  name="createdAt"
                  className="block rounded-xl w-full p-2 outline-none bg-transparent dark:text-stone-400 dark:placeholder-stone-600"
                  defaultValue={format(task.createdAt, "yyyy-MM-dd'T'HH:mm:ss")}
                  step={1}
                  max={format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss")}
                  required={true}
                />
              </div>
            </div>
          </label>

          <label>
            <div className="mb-2">Completed at</div>

            <div className="flex gap-2">
              <div className="inline-block rounded-xl bg-white dark:bg-neutral-800 shadow transition ring-offset-neutral-900 focus-within:ring-2 ring-stone-700 dark:ring-stone-700 ring-offset-2 relative flex-1">
                <input
                  type="datetime-local"
                  name="completedAt"
                  className="block rounded-xl w-full p-2 outline-none bg-transparent dark:text-stone-400 dark:placeholder-stone-600"
                  defaultValue={
                    task.completedAt
                      ? format(task.completedAt, "yyyy-MM-dd'T'HH:mm:ss")
                      : undefined
                  }
                  step={1}
                  max={format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss")}
                />
              </div>
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
              />
            </div>
          </label>
        </div>
      </Dialog>
    );
  }
);

export default TaskEditDialog;

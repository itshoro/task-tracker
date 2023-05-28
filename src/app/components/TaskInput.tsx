"use client";
import {
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  forwardRef,
} from "react";

type InputProps = ComponentPropsWithoutRef<"input">;

const TaskInput = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className="rounded-xl bg-white dark:bg-neutral-800 shadow transition ring-offset-neutral-900 focus-within:ring-2 ring-stone-700 dark:ring-stone-700 ring-offset-2 relative flex-1">
        <label className="flex items-center pl-3">
          <span className="font-medium text-lg text-stone-400">+</span>

          <input
            autoFocus={true}
            placeholder="Add a task..."
            spellCheck="false"
            autoComplete="off"
            aria-autocomplete="both"
            className="rounded-xl w-full p-2 py-3 outline-none bg-transparent dark:text-stone-400 dark:placeholder-stone-600"
            ref={ref}
            {...props}
            type="text"
          />
        </label>
      </div>
    );
  }
);

export { TaskInput };

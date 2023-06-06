import {
  type ReactNode,
  type RefObject,
  forwardRef,
  type FormEvent,
} from "react";

type DialogProps = {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onClose: () => void;
};

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ children, onSubmit, onCancel, onClose }, ref) => {
    return (
      <dialog
        ref={ref}
        className="backdrop:bg-black/50 bg-neutral-900 backdrop:backdrop-blur-sm open:animate-dialog rounded-lg"
        onCancel={onCancel}
        onClose={onClose}
      >
        <form method="dialog" className="p-4" onSubmit={onSubmit}>
          <div className="text-right mb-6">
            <button
              className="p-2 -m-1 rounded-md bg-stone-800 text-stone-400 transition ring-offset-neutral-900 focus-within:ring-2 ring-stone-700 dark:ring-stone-700 ring-offset-2 outline-none"
              type="button"
              onClick={() => {
                (ref as RefObject<HTMLDialogElement>).current!.close();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <div className="sr-only">Cancel</div>
            </button>
          </div>
          {children}
          <div className="flex mt-6">
            <button
              className="flex-1 p-2 bg-stone-800 text-stone-400 rounded-md transition ring-offset-neutral-900 focus-within:ring-2 ring-stone-700 dark:ring-stone-700 ring-offset-2 outline-none"
              type="submit"
            >
              Confirm
            </button>
          </div>
        </form>
      </dialog>
    );
  }
);

export default Dialog;

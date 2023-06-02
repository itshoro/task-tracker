import type { ComponentPropsWithoutRef } from "react";
import type { TaskProps } from ".";
import { format } from "date-fns";

type BreakTaskProps = {
  task: TaskProps;
} & ComponentPropsWithoutRef<"li">;

const BreakTask = ({ task, ...props }: BreakTaskProps) => {
  return (
    <li
      tabIndex={-1}
      className="group outline-none select-none my-0.5"
      {...props}
    >
      <div className="flex -mx-2 pl-2 text-stone-500 gap-4">
        <div className="flex gap-4 py-3">
          <span>{format(task.createdAt, "HH:mm")}</span>
        </div>
        <div className="flex-1 py-3 relative flex justify-center items-center text-stone-400 group-focus:ring-2 ring-stone-600 rounded-lg">
          <span className="z-10 bg-stone-900 rounded-lg p-1 m-2">Break</span>
          <div className="absolute inset-0">
            <svg
              className="absolute inset-0 w-full h-full text-stone-700 bg-stone-900 rounded-lg"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="diagonalStrips"
                  patternUnits="userSpaceOnUse"
                  width="20"
                  height="20"
                  patternTransform="rotate(45)"
                >
                  <line
                    x1="0"
                    y="0"
                    x2="0"
                    y2="20"
                    stroke="currentColor"
                    stroke-width="1"
                  />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#diagonalStrips)"
                opacity="1"
              />
            </svg>
          </div>
        </div>
      </div>
    </li>
  );
};

export default BreakTask;

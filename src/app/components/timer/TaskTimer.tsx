import { msToHMS } from "@/lib/timer";
import { ComponentPropsWithoutRef } from "react";

type TaskTimerProps = {
  ms: number;
} & ComponentPropsWithoutRef<"div">;

const TaskTimer = ({ ms, className, ...props }: TaskTimerProps) => {
  const { hours, minutes, seconds } = msToHMS(ms);
  return (
    <div
      className={["tabular-nums", className].filter((x) => x).join(" ")}
      {...props}
    >
      <span>{hours.toString().padStart(2, "0")}</span>:
      <span>{minutes.toString().padStart(2, "0")}</span>:
      <span>{seconds.toString().padStart(2, "0")}</span>
    </div>
  );
};

export { TaskTimer };

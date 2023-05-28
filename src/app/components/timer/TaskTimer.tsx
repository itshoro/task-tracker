import { msToHMS } from "@/lib/timer";

type TaskTimerProps = {
  ms: number;
};

const TaskTimer = ({ ms }: TaskTimerProps) => {
  const { hours, minutes, seconds } = msToHMS(ms);
  return (
    <div className="tabular-nums">
      <span>{hours.toString().padStart(2, "0")}</span>:
      <span>{minutes.toString().padStart(2, "0")}</span>:
      <span>{seconds.toString().padStart(2, "0")}</span>
    </div>
  );
};

export { TaskTimer };

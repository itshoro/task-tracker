import { useSynchronizedInterval } from "@/hooks/useSynchronizedInterval";
import { msToHMS } from "@/lib/timer";
import { useEffect, useState } from "react";
import { type TaskProps } from "../task";

type CumulativeTimerProps = {
  tasks: TaskProps[];
};

function useCumulativeTaskTime(tasks: TaskProps[]) {
  const [now, setNow] = useState(Date.now);
  const { subscribe } = useSynchronizedInterval();

  useEffect(() => {
    if (tasks.every((task) => task.completedAt !== undefined)) return;
    return subscribe((now) => setNow(now));
  }, [tasks]);

  const cumulativeMs = tasks.reduce((acc, task) => {
    /**
     * `now` is being updated using the synchronized interval, so there is a chance it may represent
     * a point in time that has already passed.
     *
     * To ensure that we always have a difference that is greater than or equal to 0 between
     * `task.createdAt` and `completedAt`, we can use `task.createdAt` as a fallback if `now` happened
     * prior.
     */
    let completedAt = task.completedAt ?? now;
    if (completedAt < task.createdAt) completedAt = task.createdAt;

    return (acc += completedAt - task.createdAt);
  }, 0);

  return cumulativeMs;
}

const CumulativeTimer = ({ tasks }: CumulativeTimerProps) => {
  const ms = useCumulativeTaskTime(tasks);
  const time = msToHMS(ms);

  return (
    <>
      <div>Time spent</div>
      <div className="tabular-nums">
        {Object.keys(time)
          .map(
            (unit) =>
              `${time[unit as keyof typeof time].toString().padStart(2, " ")}${
                unit[0]
              }`
          )
          .join(" ")}
      </div>
    </>
  );
};

export { CumulativeTimer };

import GenericTask from "./GenericTask";

type TaskProps = {
  id: string;
  type: "task";
  title: string;
  note?: string;
  createdAt: number;
  completedAt?: number;
};

function taskFromInput(input: string) {
  const now = Date.now();

  return {
    id: crypto.randomUUID(),
    title: input,
    type: "task",
    createdAt: now,
  } satisfies TaskProps;
}

export { GenericTask, taskFromInput, type TaskProps };

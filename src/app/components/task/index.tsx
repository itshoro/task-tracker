import GenericTask from "./GenericTask";

type TaskProps = {
  id: string;
  type: "task" | "break";
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
    type: input !== "/break" ? "task" : "break",
    createdAt: now,
  } satisfies TaskProps;
}

export { GenericTask, taskFromInput, type TaskProps };

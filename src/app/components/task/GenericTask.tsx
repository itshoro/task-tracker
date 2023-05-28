import type { TaskProps } from ".";

const GenericTask = ({ title }: TaskProps) => {
  return (
    <li className="" tabIndex={-1}>
      {title}
    </li>
  );
};

export default GenericTask;

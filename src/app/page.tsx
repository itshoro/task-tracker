import TasksView from "./components/TasksView";
import { SettingsTrigger } from "./components/settings";

const Page = async () => {
  return (
    <div
      className="grid gap-8"
      style={{ gridTemplateRows: "auto minmax(0, 1fr)" }}
    >
      <div className="m-4">
        <SettingsTrigger />
      </div>

      <TasksView />
    </div>
  );
};

export default Page;

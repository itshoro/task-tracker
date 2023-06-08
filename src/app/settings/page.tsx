import { ColorSchemeSelect } from "./colorScheme";

const Page = () => {
  return (
    <>
      <h1 className="text-xl">Settings</h1>
      <section className="my-4 rounded-xl ">
        <h2>Appearance</h2>

        <ColorSchemeSelect />
      </section>
    </>
  );
};

export default Page;

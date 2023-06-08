import {
  type ForwardedRef,
  forwardRef,
  type ComponentPropsWithoutRef,
  ChangeEvent,
  useId,
  ReactNode,
} from "react";

type PillGroupProps = Omit<ComponentPropsWithoutRef<"fieldset">, "onChange"> & {
  tabs: PillProps[];
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PillGroup = forwardRef(
  (
    { tabs, name, className, onChange, defaultValue, ...props }: PillGroupProps,
    ref: ForwardedRef<HTMLFieldSetElement>
  ) => {
    console.log({ defaultValue });

    return (
      <fieldset
        className={["flex gap-2", className].filter(Boolean).join(" ")}
        ref={ref}
        {...props}
      >
        {tabs.map((tab) => (
          <Pill
            key={tab.value}
            {...tab}
            name={name}
            defaultChecked={defaultValue === tab.value}
            onChange={onChange}
          />
        ))}
      </fieldset>
    );
  }
);

type PillProps = {
  children: ReactNode;
  value: string;
};

const Pill = ({
  children,
  ...props
}: PillProps & { name: string } & ComponentPropsWithoutRef<"input">) => {
  const id = useId();

  return (
    <div>
      <input className="peer appearance-none" type="radio" id={id} {...props} />
      <label
        className="py-3transition flex cursor-pointer gap-2 rounded-xl px-4 py-2 peer-checked:bg-stone-200 dark:peer-checked:bg-stone-800"
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  );
};
export default PillGroup;

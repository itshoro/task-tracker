import { ForwardedRef } from "react";
import { ComponentPropsWithoutRef, forwardRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

const Button = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const { className, ...rest } = props;
    return (
      <button
        type="button"
        className={[
          "inline-flex gap-2 rounded-xl bg-neutral-50 p-2 font-medium text-stone-700 ring-stone-400 ring-offset-2 ring-offset-stone-50 transition hover:bg-stone-200 focus:ring-2 dark:bg-neutral-900 dark:text-stone-300 dark:ring-stone-700 dark:ring-offset-neutral-900 dark:hover:bg-neutral-800",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        ref={ref}
        {...rest}
      />
    );
  }
);

export default Button;

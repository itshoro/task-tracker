import Link from "next/link";
import { ForwardedRef } from "react";
import { ComponentPropsWithoutRef, forwardRef } from "react";

type ButtonProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string | URL;
};

const Button = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    const { className: _className, href: _href, ...rest } = props;

    const className = [
      "inline-flex gap-2 rounded-xl bg-neutral-50 p-2 font-medium text-stone-700 ring-stone-400 ring-offset-2 ring-offset-stone-50 transition hover:bg-stone-200 focus:ring-2 dark:bg-neutral-900 dark:text-stone-300 dark:ring-stone-700 dark:ring-offset-neutral-900 dark:hover:bg-neutral-800",
      _className,
    ]
      .filter(Boolean)
      .join(" ");

    const href = _href.toString();

    return href.startsWith("/") ? (
      <Link ref={ref} className={className} href={href} {...rest} />
    ) : (
      <a ref={ref} className={className} href={href} {...rest} />
    );
  }
);

export default Button;

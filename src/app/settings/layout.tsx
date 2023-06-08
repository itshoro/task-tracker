import { ReactNode } from "react";
import { LinkButton } from "../components/link";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-4">
      <LinkButton href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        Back
      </LinkButton>

      <main className="py-8">{children}</main>
    </div>
  );
};

export default Layout;

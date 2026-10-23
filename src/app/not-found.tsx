import Link from "next/link";
import { AiFillWarning } from "react-icons/ai";

export default function NotFound() {
  return (
    <main className="max-container flex h-screen flex-col items-center justify-center gap-px">
      <AiFillWarning className="fill-red text-9xl" />
      <h2 className="text-center text-lg lg:text-xl">
        <span className="border-r-2 border-primary/40 pr-2 text-red">404</span>
        <span className="pl-2">
          Page not found
          <Link
            href="/"
            className="ml-1 text-blue underline underline-offset-4"
          >
            Back to Home
          </Link>
        </span>
      </h2>
    </main>
  );
}

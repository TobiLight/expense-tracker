import { Link, Links, LiveReload, Outlet, useCatch, Meta, LinksFunction, MetaFunction, Scripts, ScrollRestoration, useNavigate } from "remix";

import appStyles from "./styles/appstyles.css";
import main from "./styles/main.css"

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: appStyles
    },
    {
      rel: 'stylesheet',
      href: main
    }
  ];
};

export const meta: MetaFunction = () => {
  return {
    description: 'Track the way you spend money one day at a time!',
    keywords: "expense, tracker, expense tracker, expense manager, manager",
    // "twitter:image": "",
    // "twitter:card": "summary_large_image",
    // "twitter:creator": "@remix_run",
    // "twitter:site": "@remix_run",
    // "twitter:title": "Remix Jokes",
    // "twitter:description": 'Learn Remix and laugh at the same damn time!'
  }
}

function Document({
  children,
  title = ``
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en" className="min-h-screen h-full md:hidden">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, maximum-scale=1"></meta>
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" ? (
          <LiveReload />
        ) : null}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document
      title={`${caught.status} ${caught.statusText}`}
    >
      <div className="error-container min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl">
          {caught.status} {caught.statusText}
        </h1>
        <Link to="/">Go back</Link>
      </div>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Uh-oh!">
      <div className="error-container  flex flex-col justify-center items-center min-h-screen">
        <div className="bg-red-500 p-2 w-11/12 rounded text-white">
          <h1>App Error</h1>
          <p>{error.message}</p>
        </div>
      </div>
    </Document>
  );
}
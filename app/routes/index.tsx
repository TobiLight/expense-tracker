import { Link, LinksFunction, MetaFunction, useCatch } from "remix";
import appStyles from "~/styles/appstyles.css"

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: appStyles }
  ]
}

export const meta: MetaFunction = () => {
  return {
    title: 'Expense Tracker',
    description: 'Track my expense'
  }
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }} className="w-full">
      <div className="home">
        <h1 className="text-3xl font-bold text-center">Expense Tracker</h1>
        <p className="text-center">Track whatever you spend your money on easily.</p>
        <div className="flex justify-center mt-6">
          <Link prefetch="intent" to="/auth" className="bg-[#283d3e] text-[#ffffc0] rounded px-3 py-1 shadow">Start tracking</Link>
        </div>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch()
}
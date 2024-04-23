import Link from "next/link";


export default function Home() {
  return (
    <div className="w-7/12 mx-auto flex flex-col my-8">
      <h1 className="text-6xl font-semibold">MR Frontend Developer Technical Test</h1>
      <div className="my-4">

      </div>
      <Link href="/product" className="w-fit border-2 border-borderDark text-fontDark font-semibold hover:bg-borderDark hover:text-white transition duration-200 ease-out hover:ease-in px-6 py-2 uppercase text-sm rounded">Check demo</Link>
    </div>
  );
}

export default function () {
  return (
    <div className="h-20">
    {/* Navbar */}
    <nav className="flex items-center px-4 py-4 h-full text-white bg-zinc-800 ">
      <p className="w-5/12 font-logo text-3xl">
        <span className="text-orange-700">L</span>arry
        <span className="text-orange-700">C</span>odes
      </p>
      <div className="flex w-7/12 items-center justify-end">
        <div className="flex justify-between text-xl ">
          {" "}
          <a
            className="text-white font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Home
          </a>
          <a
            className="ml-8 text-white font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Projects
          </a>
          <a
            className="mx-8 text-white font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Get Funded
          </a>
        </div>
      </div>
    </nav>
    </div>

  );
}

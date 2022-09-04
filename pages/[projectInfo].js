export default function PageInfo() {
  return (
    <>
      <section>
        <div className="h-20">
          {/* Navbar */}
          <nav className="flex items-center px-4 py-4 h-full text-white bg-black ">
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
      </section>
      <section>
        <h1 className="w-full text-center pt-3 text-3xl">Flying To Mars</h1>
        <p className="text-center text-gray-800">
          Mars, aside from earth is another suitable planet to travel to.{" "}
        </p>
        <div className="flex mt-11">
          <div className="flex flex-col w-7/12 px-8">
            <div className="w-full h-96">
              <img
                alt="..."
                src="/bg1.jpg"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="py-4">
              <h1 className="text-4xl text-gray-800 pt-10 pb-4">Why do I need this fund?</h1>
              <p>So, they always say that everyone has a purpose of being in this earth. It took me a very long time before I discovered my purpose of existing on earth. After pondering over and over, I decided that before I die, I'm gonna fulfill the purpose of my existence. <br/><br/> So, My purpose is to travel to all the planet in the world.</p>
            </div>
          </div>
          <div className="mx-8 w-5/12 px-8">
            <div className="bg-neutral-300 h-4 dark:bg-gray-700">
              <div
                className="bg-green-600 h-4 "
                style={{ width: `${80}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-sm">
              <p className="bg-yellow-100 text-yellow-800 rounded-md p-2 px-3 ">
                75% funded
              </p>
              <p className="bg-green-100 text-green-800 rounded-md p-2 px-3 ">
                12 backers
              </p>
            </div>

            <div className="flex flex-col mt-6">
              <h1 className="text-3xl text-gray-800">$290,789</h1>
              <p className="text-sm text-gray-500">raised of $500,000</p>
            </div>

            <button className="mt-6 w-full rounded-md p-2 bg-green-200 text-green-800">
              Back this Project
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

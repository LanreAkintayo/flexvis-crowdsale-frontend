import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <section>
      {/* Navbar */}
      <nav className="flex items-center px-4 py-4 text-white bg-black ">
        <p className="w-5/12 font-logo text-3xl"><span className="text-orange-700">L</span>arry<span className="text-orange-700">C</span>odes</p>
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
    </section>
  )
}

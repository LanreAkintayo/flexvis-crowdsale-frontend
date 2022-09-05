import Footer from "../components/Footer";
import Header from "../components/Header";
import React from "react";

export default function () {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    // props.handleFile(fileUploaded);
    console.log("I am here");
  };

  return (
    <>
      <Header />
      <section>
        <div className="w-full flex my-5 text-xl flex-col items-center">
          <h1>Make it easy for people to learn about your project</h1>
        </div>
        <div className="flex border-t my-11 border-gray-300 py-4 px-16 ">
          <div className="w-5/12 ">
            <h1>Project Title</h1>
            <p className="text-sm text-gray-600">
              Write a clear, brief title and subtitle to help people quickly
              understand your project. Both will appear on your project and
              pre-launch pages. <br />
              <br />
              Potential backers will also see them if your project appears on
              category pages, search results, or in emails we send to our
              community.
            </p>
          </div>
          <div className="w-7/12 px-11 ">
            <div>
              <h1>Title</h1>

              <input
                type="text"
                name="text"
                id="text"
                placeholder="Write a short Title"
                className="w-80 block p-2 text-sm mt-1 border border-gray-100 focus:outline-none rounded-md"
              />
            </div>

            <div className="mt-7 ">
              <h1>Subtitle</h1>

              <input
                type="text"
                name="text"
                id="text"
                placeholder="A short subtitle is going to help"
                className="w-80 block p-2 text-sm mt-1 border border-gray-100 focus:outline-none rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex border-t my-11 border-gray-300 py-4 px-16 ">
          <div className="w-5/12 ">
            <h1>Project Image</h1>
            <p className="text-sm text-gray-600">
              Add an image that clearly represents your project. Choose one that
              looks good at different sizes—it’ll appear on your project page,
              across the website
              <br />
              <br />
            </p>
          </div>
          <div className="w-7/12 px-11 ">
            <div className="">
              <div className="border border-gray-300 h-40 w-full hover:bg-gray-100">
                <button className="w-full h-full" onClick={handleClick}>
                  <p className="text-sm">Select a File</p>
                  <p className="text-sm text-gray-500">
                    <small>It must be a JPG, PNG, GIF, TIFF, or BMP.</small>
                  </p>
                </button>
                <input
                  type="file"
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                  onChange={handleChange}
                  className="w-80 block p-2 text-sm mt-1 border border-gray-100 focus:outline-none rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex border-t my-11 border-gray-300 py-4 px-16 ">
          <div className="w-5/12 ">
            <h1>Launch Date</h1>
            <p className="text-sm text-gray-600">
              Select a date you want your project to be launched. Project will
              not appear on the website until the launch date.
              <br />
              <br />
            </p>
          </div>
          <div className="w-7/12 px-11 ">
            <div className="border border-gray-300 h-40 w-full">
              <div className="flex">
                <div className="flex flex-col ml-4 my-2">
                  <p className="text-sm">Day</p>
                  <input
                    type="text"
                    name="text"
                    id="text"
                    placeholder=""
                    className="w-12 h-10 block p-2 text-sm mt-1 border border-gray-200 focus:outline-none "
                  />
                </div>
                <div className="flex flex-col">
                  {" "}
                  <div className="flex flex-col ml-4 my-2">
                    <p className="text-sm">Month</p>
                    <input
                      type="text"
                      name="text"
                      id="text"
                      placeholder=""
                      className="w-12 h-10 block p-2 text-sm mt-1 border border-gray-200 focus:outline-none "
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col ml-4 my-2">
                    <p className="text-sm">Year</p>
                    <input
                      type="text"
                      name="text"
                      id="text"
                      placeholder=""
                      className="w-14 h-10 block p-2 text-sm mt-1 border border-gray-200 focus:outline-none "
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col ml-4 my-2">
                    <p className="text-sm">Use Calendar</p>
                    <input
                      type="text"
                      name="text"
                      id="text"
                      placeholder=""
                      className="w-14 h-10 block p-2 text-sm mt-1 border border-gray-200 focus:outline-none "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

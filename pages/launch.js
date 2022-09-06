import Footer from "../components/Footer";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "sassy-datepicker";

export default function Launch() {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  const [launchDate, setLaunchDate] = useState("");
  const [projectInfo, setProjectInfo] = useState({
    title: "",
    subtitle: "",
    note: "",
    imageSrc: "",
    launchDate: new Date(),
    duration: "",
  });
  const [isValidDuration, setIsValidDuration] = useState(true);
  const [isValidLaunchDate, setIsValidLaunchDate] = useState(true);

  const onlyNumberKey = (event) => {
    // Only ASCII character in that range allowed
    var ASCIICode = event.which ? event.which : event.keyCode;
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
    return true;
  };

  useEffect(() => {
    console.log(projectInfo);
  }, [projectInfo]);

  useEffect(() => {
    console.log(launchDate);
  }, [launchDate]);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleOnChange = (event) => {
    // console.log(event.target.value);
    // console.log(event.target.id);
    // console.log(typeof event)

    let imageUrl;

    if (event.target.id == "imageSrc") {
      imageUrl = URL.createObjectURL(event.target.files[0]);
      console.log("ImageUrl: ", imageUrl);
    }
    if (event.target.id == "duration") {
      const duration = event.target.value;
      setIsValidDuration(() => {
        if (
          /[^0-9]/g.test(duration.toString()) ||
          Number(duration) > 60 ||
          Number(duration) < 1
        ) {
          return false;
        }
        return true;
      });
    }

    setProjectInfo((prevProjectInfo) => {
      return {
        ...prevProjectInfo,
        [event.target.id]:
          event.target.id == "imageSrc" ? imageUrl : event.target.value,
      };
    });
  };

  // const [startDate, setStartDate] = useState(new Date());

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
                onChange={handleOnChange}
                type="text"
                maxLength="80"
                name="text"
                id="title"
                placeholder="Write a short Title"
                className="w-96 block p-2 text-sm mt-1 border border-gray-100 focus:outline-none rounded-md"
              />
            </div>

            <div className="mt-7">
              <h1>Subtitle</h1>

              <input
                onChange={handleOnChange}
                type="text"
                name="text"
                id="subtitle"
                maxLength="100"
                placeholder="A short subtitle is going to help"
                className="w-96 block p-2 text-sm mt-1 border border-gray-100 focus:outline-none rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex border-t my-11 border-gray-300 py-4 px-16 ">
          <div className="w-5/12 ">
            <h1>Description (Why do you need this fund)</h1>
            <p className="text-sm text-gray-600">
              Write a note on why you choose to launch a campaign. This is
              really going to help in getting the attention of potential
              backers.
            </p>
          </div>
          <div className="w-7/12 px-11 ">
            <div>
              <h1>Note</h1>
              <textarea
                onChange={handleOnChange}
                cols="50"
                wrap="soft"
                placeholder="Write a short note"
                id="note"
                className="w-full  h-60 text-clip block p-2 text-sm mt-1 border border-gray-100 focus:outline-none rounded-md"
              ></textarea>
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
              <div className="border border-gray-300 h-80 w-full hover:bg-gray-200">
                <button
                  className="w-full h-full"
                  id="image"
                  onClick={handleClick}
                >
                  {projectInfo.imageSrc ? (
                    <div className="w-full h-full">
                      <img
                        alt="..."
                        src={projectInfo.imageSrc}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm">Select a File</p>
                      <p className="text-sm text-gray-500">
                        <small>It must be a JPG, PNG, GIF, TIFF, or BMP.</small>
                      </p>
                    </div>
                  )}
                </button>
                <input
                  type="file"
                  id="imageSrc"
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                  onChange={handleOnChange}
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
            <div className="flex items-center">
              <div className="flex flex-col">
                <div className="flex flex-col ml-4 my-2">
                  <p className="text-sm">Use Calendar</p>
                  <div>
                    <div className="flex bg-gray-50 border px-2 border-gray-300 items-center p-2">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>

                      {/* <DatePicker /> */}

                      <DatePicker
                        id="launchDate"
                        className=" text-gray-900 bg-gray-50 p-2 sm:text-sm outline-none "
                        selected={projectInfo.launchDate}
                        onChange={(date) => {
                          const dateInMilliseconds = date.getTime();
                          const currentDateInMilliseconds =
                            new Date().getTime();

                          setIsValidLaunchDate(
                            dateInMilliseconds > currentDateInMilliseconds
                              ? true
                              : false
                          );

                          setProjectInfo((prevProjectInfo) => {
                            return {
                              ...prevProjectInfo,
                              launchDate: date,
                            };
                          });
                          // setLaunchDate(date);
                        }}
                      />
                    </div>
                    {!isValidLaunchDate && (
                      <p className="text-red-700 text-sm">
                        <small>
                          The Launch date should be greater than the current
                          date
                        </small>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex border-t mt-11 border-gray-300 py-4 px-16 ">
          <div className="w-5/12 ">
            <h1>Campaign Duration</h1>
            <p className="text-sm text-gray-600">
              Set a time limit for your campaign. You won’t be able to change
              this after you launch.
              <br />
              <br />
            </p>
          </div>
          <div className="w-7/12 px-11 ">
            <div>
              <h1>Enter Number of days (1 - 60) </h1>

              <input
                onChange={handleOnChange}
                type="text"
                name="text"
                id="duration"
                placeholder="1"
                className="w-80 block p-2 text-sm mt-1 border border-gray-100 focus:outline-none rounded-md"
              />
              {!isValidDuration && (
                <p className="text-red-700 text-sm">
                  <small>Duration should be within 1 and 60</small>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full items-center my-5 mb-14">
          <h1 className="px-5 rounded-md bg-green-300 text-green-800 py-3">
            Launch Your Project
          </h1>
        </div>
      </section>
      <Footer />
    </>
  );
}
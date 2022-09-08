import Header from "../components/Header";
import SupportModal from "../components/SupportModal";

export default function PageInfo({projectInfo}) {

  console.log("Project Info: ", projectInfo)

  return (
    <>
      <section>
        <div className="h-20">
          {/* Navbar */}
          <Header />
        </div>
      </section>
      <section>
        <h1 className="w-full text-center pt-3 text-3xl">{projectInfo.projectTitle}</h1>
        <p className="text-center text-gray-800">
         {projectInfo.projectSubtitle}
        </p>
        <div className="flex flex-col lg:flex-row mt-11">
          <div className="flex flex-col lg:w-7/12 px-8">
            <div className="flex justify-between text-xl text-gray-500 my-3 py-3 border-b-2">
              <button>Home</button>
              <button>Backers</button>
              <button>Updates</button>
              <button>Comments</button>
            </div>
            <div className="w-full h-96">
              <img
                alt="..."
                src={projectInfo.projectImageUrl}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="py-4">
              <h1 className="text-4xl text-gray-800 pt-10 pb-4">
                Why do I need this fund?
              </h1>
              <p>
                {projectInfo.projectNote}
              </p>
            </div>
          </div>
          <div className="mx-8 lg:w-5/12 lg:px-8">
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

            <button className="my-6 w-full rounded-md p-2 bg-green-200 text-green-800">
              Support this Project
            </button>
          </div>
        </div>
      </section>

      <div className="flex justify-center text-center sm:block sm:p-0 mt-2 scrollbar-hide">
        {/* <SupportModal /> */}
      </div>

      <footer className="bg-zinc-800 text-gray-400 flex justify-between items-center flex-col">
        <h1 className="text-xl pb-2 pt-1 ">
          <u>Get in Touch</u>
        </h1>
        <div className="flex">
          <div>
            <img
              alt="..."
              src="/github.svg"
              className="object-cover rounded-md "
            />
          </div>
          <div>
            <img
              alt="..."
              src="/linkedin.svg"
              className="object-cover ml-4 rounded-md "
            />
          </div>
          <div>
            <img
              alt="..."
              src="/twitter.svg"
              className="object-cover ml-4 rounded-md "
            />
          </div>
          <div>
            <img
              alt="..."
              src="/youtube.svg"
              className="object-cover ml-4 rounded-md "
            />
          </div>
          <div>
            <img
              alt="..."
              src="/email.png"
              className="object-cover w-7 h-7 ml-4 rounded-md "
            />
          </div>
        </div>
        <p className="mt-4 text-sm">© 2022 Made by LarryCodes</p>
      </footer>
    </>
  );
}


export async function getServerSideProps(context) {


  const query = context.query;

  // const image = JSON.parse(query.image);

  // const availableAmountInContract = JSON.parse(query.availableAmountInContract);
  // const totalBorrowedInContract = JSON.parse(query.totalBorrowedInContract);
  // const totalSuppliedInContract = JSON.parse(query.totalSuppliedInContract);
  // const userTokenBorrowedAmount = JSON.parse(query.userTokenBorrowedAmount);
  // const userTokenLentAmount = JSON.parse(query.userTokenLentAmount);
  // const walletBalance = JSON.parse(query.walletBalance);

  const projectInfo = {
    ...query,
  };


  return {
    props: {
      projectInfo
    },
  };
}

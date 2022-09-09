export default function Footer() {
  return (
    <footer className="bg-zinc-800 mt-7 text-gray-400 flex justify-between items-center flex-col">
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
            className="object-cover ml-3 rounded-md "
          />
        </div>
        <div>
          <img
            alt="..."
            src="/twitter.svg"
            className="object-cover ml-3 rounded-md "
          />
        </div>
        <div>
          <img
            alt="..."
            src="/youtube.svg"
            className="object-cover ml-3 rounded-md "
          />
        </div>
        <div>
          <img
            alt="..."
            src="/email.png"
            className="object-cover w-8 h-8 ml-3 rounded-md "
          />
        </div>
      </div>
      <p className="mt-4 text-sm">© 2022 Made by LarryCodes</p>
    </footer>
  );
}

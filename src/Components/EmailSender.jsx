import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { sendEmail } from "../Services/email.service";
import { IoMoon, IoSunny } from "react-icons/io5";
import JoditEditor from "jodit-react";

const EmailSender = () => {
  const fileInputRef = useRef(null);

  const [emailData, setEmailData] = useState({
    to: "",
    sub: "",
    msg: "",
    attachment: null,
  });

  const [sending, setSending] = useState(false);

  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  function handleFieldChange(event, name) {
    setEmailData({ ...emailData, [name]: event.target.value });
  }

  function handleFileChange(e) {
    setEmailData({
      ...emailData,
      attachment: e.target.files[0],
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (emailData.to === "") {
      toast.error("Enter the recipient name");
      return;
    }
    if (emailData.sub === "") {
      toast.error("Enter the subject");
      return;
    }

    const formData = new FormData();
    const req = {
      to: emailData.to,
      sub: emailData.sub,
      msg: emailData.msg,
    };

    formData.append("req", new Blob([JSON.stringify(req)], { type: "application/json" }));
    if (emailData.attachment) {
      formData.append("file", emailData.attachment); 
    }

    try {
      setSending(true);
      await sendEmail(formData); 
      toast.success("Email sent Successfully");
      setEmailData({
        to: "",
        sub: "",
        msg: "",
        attachment: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.log(error);
      toast.error("Email not sent");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-300 dark:bg-gray-800">
      <div className="email_card mt-1 md:w-1/2 w-full mx-4 md:mx-0 bg-white dark:bg-gray-600 -mt-10 p-4 rounded-lg border dark:border-none shadow dark:">
        <div className="flex justify-end">
          <button className="align-right" onClick={() => darkModeHandler()}>
            {dark ? <IoSunny size={25} /> : <IoMoon size={25} />}
          </button>
        </div>
        <h1 className="text-gray-900  dark:text-white text-3xl">
          Email-Sender
        </h1>
        <p className="text-gray-700 dark:text-white text-gray-900 dark:text-white">
          Now send your mail instantly
        </p>

        <form action="" onSubmit={handleSubmit}>
          <div className="input_field mt-2">
            <label
              htmlFor="large-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              To
            </label>
            <input
              value={emailData.to}
              onChange={(event) => handleFieldChange(event, "to")}
              type="text"
              id="large-input"
              placeholder="To whom you want to send"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-100 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="input_field mt-2">
            <label
              htmlFor="large-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Subject
            </label>
            <input
              value={emailData.sub}
              onChange={(event) => handleFieldChange(event, "sub")}
              type="text"
              id="large-input"
              placeholder="Write the subject"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-100 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="text_area mt-4">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              value={emailData.msg}
              onChange={(event) => handleFieldChange(event, "msg")}
              type="text"
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>

            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload file
            </label>
            <input
              ref={fileInputRef}
              onChange={handleFileChange}
              class="block w-full text-sm text-gray-900 border border-gray-900 rounded-lg cursor-pointer bg-gray-100 dark:text-black focus:outline-none dark:bg-white dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              
            />

            
          </div>

          {sending && (
            <div className="loader flex-col gap-2 items-center flex justify-cenetr mt-4">
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
              <h1>Sending Email...</h1>
            </div>
          )}

          <div className="button_conatiner flex justify-center gap-3 mt-3">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Send
            </button>
            <button className="focus:outline-none text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailSender;

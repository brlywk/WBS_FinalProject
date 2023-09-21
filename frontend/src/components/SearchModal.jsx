import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react"; // Added useRef import
import useSearch from "../hooks/useSearch";

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { startSearch } = useSearch();
  const inputRef = useRef(); // Created a ref for the input field

  const handleSearch = async (query) => {
    const results = await startSearch(query);
    console.log(results);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center space-x-2 rounded-lg border border-gray-900/10 bg-white/50 px-3 py-1.5 shadow-sm hover:border-gray-300 focus:border-gray-300 focus:outline-none"
      >
        <svg
          className="-ml-1 flex-none text-gray-400"
          width="24"
          height="24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m19 19-3.5-3.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <circle
            cx="11"
            cy="11"
            r="6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></circle>
        </svg>
        <span className="flex-1 text-left text-sm text-gray-400">
          Search...
        </span>
        <span className="flex-none text-xs font-semibold text-gray-400">
          Ctrl+K
        </span>
      </button>

      <Transition show={isOpen} as={Fragment} className="w-full">
        <Dialog
          as="div"
          className="fixed inset-0 z-50 flex h-full w-full items-center justify-center" // Changed items-start to items-center to center the modal vertically
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="w-full duration-200"
            enterFrom="scale-100 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="duration-200 ease-in"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-100 opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <Transition.Child
            enter="duration-200 ease-out"
            enterFrom="scale-95 opacity-0"
            enterTo="flex w-full scale-100 justify-center opacity-100"
            leave="duration-200 ease-in"
            leaveFrom="flex w-full scale-100 justify-center opacity-100"
            leaveTo="flex w-full scale-95 justify-center opacity-0"
          >
            <div className="w-1/2 rounded-xl bg-white px-4 py-2 shadow-xl">
              <form
                className="flex items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(inputRef.current.value); // Used the ref to get the input value
                }}
              >
                <svg
                  className="h-5 w-5 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

                <input
                  ref={inputRef} // Assigned the ref to the input field
                  className="w-full border-gray-100 bg-white/25  py-4 pl-12 placeholder-gray-400 outline-none"
                  type="text"
                  placeholder="Search..."
                />

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xxs flex items-center rounded-md border border-gray-200 p-1.5 font-semibold uppercase tracking-wider text-gray-700 focus:border-gray-300 focus:outline-none"
                  type="button"
                >
                  Esc
                </button>
              </form>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

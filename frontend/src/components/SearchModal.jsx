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
        className="flex items-center space-x-2 border border-gray-900/10 shadow-sm px-3 py-1.5 hover:border-gray-300 focus:outline-none focus:border-gray-300 rounded-lg"
      >
        <svg
          className="flex-none text-gray-400 -ml-1"
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
        <span className="text-sm text-gray-400 flex-1 text-left">Search...</span>
        <span className="flex-none text-xs font-semibold text-gray-400">
          Ctrl+K
        </span>
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 flex items-center justify-center" // Changed items-start to items-center to center the modal vertically
          onClose={() => setIsOpen(false)}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-70" />

          <Transition.Child
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="overflow-hidden w-full max-w-2xl bg-white rounded-lg mx-4 max-h-[80vh] mt-[10vh] relative">
              <form
                className="flex items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(inputRef.current.value); // Used the ref to get the input value
                }}
              >
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-700"
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
                </div>

                <input
                  ref={inputRef} // Assigned the ref to the input field
                  className="w-full py-4 pl-12 border-b border-gray-100 outline-none placeholder-gray-400"
                  type="text"
                  placeholder="Search..."
                />

                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center p-1.5 uppercase font-semibold tracking-wider text-gray-700 rounded-md border border-gray-200 focus:outline-none focus:border-gray-300 text-xxs"
                    type="button"
                  >
                    Esc
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}



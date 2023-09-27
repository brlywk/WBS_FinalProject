import { Dialog, Listbox, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { useDataContext } from "../contexts/dataContext";
import useSubscription from "../hooks/useSubscription";
import eventEmitter from "../utils/EventEmitter";
import CategoryIcon from "./CategoryIcon";
import { createSubscriptionBody } from "../utils/schemaBuilder";

export default function SubscriptionForm({
  mode,
  subscription,
  opened,
  onClose,
}) {
  // ---- Data Context ----
  const { allCategories } = useDataContext();

  // ---- Some settings ----
  const billingCycles = ["month", "year"];
  const noneCategoryId = "65085704f18207c1481e6642";

  // ---- State ----
  const [selectedCategory, setSelectedCategory] = useState(
    subscription?.category ??
      allCategories.find((c) => c._id === noneCategoryId),
  );
  const [selectedBillingCycle, setSelectedBillingCycle] = useState(
    subscription?.interval ?? "month",
  );
  const [working, setWorking] = useState();

  // ---- HOOKS ----
  const { createSubscription, updateSubscription, deleteSubscription } =
    useSubscription();

  // ---- REFS ----
  const nameRef = useRef();
  const priceRef = useRef();

  // ---- FUNCTIONS ----
  // switch to another form mode
  function switchMode(mode) {
    eventEmitter.emit("changeFormMode", mode);
  }

  // create temp. subscription from current form data
  function createSubscriptionDataFromForm() {
    const cleanPrice = parseFloat(priceRef.current.value.replace(",", "."));

    if (isNaN(cleanPrice)) {
      alert("Price must be a valid number!");
      return;
    }

    const formSubscription = createSubscriptionBody(
      nameRef.current.value,
      cleanPrice,
      selectedCategory._id,
      selectedBillingCycle,
    );

    return formSubscription;
  }

  // Sub should be added
  async function handleAddSubscription() {
    // TODO: Better validation, i.e. show user which fields are missing
    if (!nameRef.current?.value || !priceRef.current?.value) {
      alert("Please enter a name and price");
      return;
    }

    setWorking(true);

    const newSubscription = createSubscriptionDataFromForm();

    try {
      const abortController = new AbortController();
      const { successful } = await createSubscription(
        newSubscription,
        abortController,
      );

      if (!successful) {
        throw new Error("Unable to save subscription");
      }
    } catch (error) {
      // TODO: Make this nicer
      alert(error.message);
    } finally {
      setWorking(false);
      eventEmitter.emit("refetchData");
    }

    onClose();
  }

  // Change in edit mode needs to be saved
  async function handleSaveEditSubscription() {
    if (!subscription._id) return;

    setWorking(true);

    const updatedSubscription = createSubscriptionDataFromForm();
    updatedSubscription._id = subscription._id;

    console.log("Trying to update id", subscription._id);

    try {
      const abortController = new AbortController();
      const subscriptionUpdate = await updateSubscription(
        updatedSubscription,
        abortController,
      );
    } catch (error) {
      alert(error.message);
    } finally {
      setWorking(false);
      eventEmitter.emit("refetchData");
    }

    onClose();
  }

  // Sub should be deleted
  async function handleDeleteSubscription() {
    if (!subscription._id) return;

    setWorking(true);

    try {
      const abortController = new AbortController();

      const { successful } = await deleteSubscription(
        subscription._id,
        abortController,
      );

      if (!successful) {
        throw new Error("Unable to delete subscription");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setWorking(false);
      eventEmitter.emit("refetchData");
    }

    onClose();
  }

  return (
    <Transition show={opened} as={Fragment} className="w-full">
      <Dialog
        className="fixed inset-0 z-10 flex items-center justify-center"
        open={opened}
        onClose={onClose}
      >
        {/* Backdrop overlay */}
        <Transition.Child
          as={Fragment}
          enter="w-full duration-200"
          enterFrom="scale-100 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-100 opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur" />
        </Transition.Child>

        {/* Dialog Content */}
        <Transition.Child
          enter="duration-200 ease-out"
          enterFrom="scale-95 opacity-0"
          enterTo="flex w-full scale-100 justify-center opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="flex w-full scale-100 justify-center opacity-100"
          leaveTo="flex w-full scale-95 justify-center opacity-0"
        >
          <Dialog.Panel className="z-20 rounded-lg bg-white p-4">
            {/* Title Bar */}
            <Dialog.Title className="text-xl font-bold uppercase">
              {mode} Subscription
            </Dialog.Title>

            {/* Subscription Form */}
            <div className="grid grid-cols-[max-content_1fr] gap-4">
              {/* Subscription Name */}
              <label htmlFor="name">Name</label>
              {(mode === "add" || mode === "edit") && (
                <input
                  ref={nameRef}
                  type="text"
                  name="name"
                  placeholder="Subscription Name"
                  defaultValue={subscription?.name}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              )}

              {mode === "show" && (
                <div className="text-sm font-medium leading-none text-gray-900">
                  {subscription?.name}
                </div>
              )}

              {/* Price */}
              <label htmlFor="price">Price</label>
              {(mode === "add" || mode === "edit") && (
                <input
                  ref={priceRef}
                  type="text"
                  name="price"
                  placeholder="Price in EUR"
                  defaultValue={subscription?.price}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              )}

              {mode === "show" && (
                <div className="text-sm font-medium leading-none text-gray-900">
                  {subscription?.price}
                </div>
              )}

              {/* Category */}
              <label
                htmlFor="category"
                className="text-sm font-medium leading-none text-gray-600"
              >
                Category
              </label>

              {(mode === "add" || mode === "edit") && (
                <div className="relative inline-block w-full">
                  <Listbox
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    name="category"
                  >
                    <Listbox.Button className="relative cursor-default rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm w-full">
                      <span className="flex items-center">
                        <CategoryIcon
                          icon={selectedCategory?.icon}
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3 block truncate">
                          {selectedCategory?.name}
                        </span>
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 8.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {allCategories?.map((category) => (
                        <Listbox.Option
                          key={category._id}
                          value={category}
                          className="relative cursor-default select-none py-2 pl-3 pr-9"
                        >
                          <span className="flex items-center">
                            <CategoryIcon
                              icon={category?.icon}
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="ml-3 block truncate font-normal">
                              {category?.name}
                            </span>
                          </span>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Listbox>
                </div>
              )}

              {mode === "show" && (
                <div className="flex items-center">
                  <CategoryIcon
                    icon={subscription?.category?.icon}
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <div className="ml-3 text-sm font-medium leading-none text-gray-900">
                    {subscription?.category?.name}
                  </div>
                </div>
              )}

              {/* Billing Cycle */}
              <label
                htmlFor="billing_cycle"
                className="text-sm font-medium leading-none text-gray-600"
              >
                Billing Cycle
              </label>

              {(mode === "add" || mode === "edit") && (
                <div className="relative inline-block w-full">
                  <Listbox
                    value={selectedBillingCycle}
                    onChange={setSelectedBillingCycle}
                    name="billingCycle"
                  >
                    <Listbox.Button className="relative cursor-default rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm w-full">
                      per {selectedBillingCycle}
                    </Listbox.Button>

                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {billingCycles.map((cycle) => (
                        <Listbox.Option
                          key={cycle}
                          value={cycle}
                          className="relative cursor-default select-none py-2 pl-3 pr-9"
                        >
                          per {cycle}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Listbox>
                </div>
              )}

              {mode === "show" && (
                <div className="text-sm font-medium leading-none text-gray-900">
                  per {subscription?.interval}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-end gap-2">
              {mode === "edit" && (
                <button
                  className="inline-flex justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  onClick={handleDeleteSubscription}
                >
                  Delete
                </button>
              )}

              {mode !== "edit" && (
                <button
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => switchMode("edit")}
                >
                  Edit
                </button>
              )}

              {mode === "edit" && (
                <>
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSaveEditSubscription}
                  >
                    Save
                  </button>

                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    onClick={() => onClose()}
                  >
                    Cancel
                  </button>
                </>
              )}

              {mode !== "edit" && (
                <button
                  className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleAddSubscription}
                >
                  Add
                </button>
              )}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

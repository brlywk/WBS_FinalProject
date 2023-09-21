import { Dialog, Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import CategoryIcon from "./CategoryIcon";
import useSubscription from "../hooks/useSubscription";

export default function SubscriptionForm({
  mode = "show",
  opened,
  onClose,
  subscription = {},
  categories,
}) {
  // ---- Some settings ----
  const billingCycles = ["month", "year"];
  const noneCategoryId = "65085704f18207c1481e6642";

  // This feels very hack-y... might need to refactor everything to use a context
  const setInitialCategory = () => {
    if (mode === "add") {
      return categories.find((c) => c._id === noneCategoryId);
    } else {
      return subscription.category;
    }
  };

  const setInitialBillingCycle = () => {
    if (mode === "add") {
      return "month";
    } else {
      return subscription.interval;
    }
  };

  // ---- State ----
  const [selectedCategory, setSelectedCategory] = useState(
    setInitialCategory(),
  );
  const [selectedBillingCycle, setSelectedBillingCycle] = useState(
    setInitialBillingCycle(),
  );
  const [currentMode, setCurrentMode] = useState(mode);
  const [openSubscription, setOpenSubscription] = useState(subscription);
  const [working, setWorking] = useState();

  // ---- Custom hooks ----
  const { createSubscription, updateSubscription, deleteSubscription } =
    useSubscription();

  // ---- Refs ----
  const nameRef = useRef();
  const priceRef = useRef();

  // ---- Functions ----

  // create temp. subscription from current form data
  function createSubscriptionDataFromForm() {
    const cleanPrice = parseFloat(priceRef.current.value.replace(",", "."));

    if (isNaN(cleanPrice)) {
      alert("Price must be a valid number!");
      return;
    }

    const formSubscription = {
      name: nameRef.current.value,
      price: cleanPrice,
      category: selectedCategory._id,
      interval: selectedBillingCycle,
    };

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
    }

    onClose();

    // TODO: Reset Form Data once saving is successful
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

      console.log(subscriptionUpdate);
    } catch (error) {
      alert(error.message);
    } finally {
      setWorking(false);
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
    }

    onClose();
  }

  // close form handler, we need this because we otherwise don't exit edit mode
  function handleClose() {
    console.log("Close", mode);
    setCurrentMode(mode);
    onClose();
  }

  return (
    <Transition show={opened} as={Fragment} className="w-full">
      <Dialog
        className="fixed inset-0 z-10 flex items-center justify-center"
        isOpen={opened}
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
              {currentMode} Subscription
            </Dialog.Title>

            {/* Subscription Form */}
            <div className="grid grid-cols-[max-content_1fr] gap-4">
              {/* Subscription Name */}
              <label htmlFor="name">Name</label>
              {(currentMode === "add" || currentMode === "edit") && (
                <input
                  type="text"
                  name="name"
                  placeholder="Subscription Name"
                  ref={nameRef}
                  defaultValue={subscription.name || ""}
                />
              )}
              {currentMode === "show" && <div>{subscription.name}</div>}

              {/* Price */}
              <label htmlFor="price">Price</label>
              {(currentMode === "add" || currentMode === "edit") && (
                <input
                  type="text"
                  name="price"
                  placeholder="Price in EUR"
                  ref={priceRef}
                  defaultValue={subscription.price || ""}
                />
              )}
              {currentMode === "show" && <div>{subscription.price}</div>}

              {/* Category */}
              <label htmlFor="category">Category</label>
              {(currentMode === "add" || currentMode === "edit") && (
                <Listbox
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  as="div"
                  name="category"
                >
                  <Listbox.Button className="">
                    <div className="flex items-center gap-2">
                      <CategoryIcon icon={selectedCategory.icon} />
                      <div>{selectedCategory.name}</div>
                    </div>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto  rounded-md bg-white p-4 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {categories.map((category) => (
                      <Listbox.Option
                        key={category._id}
                        value={category}
                        className="cursor-pointer p-2 hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-2">
                          <CategoryIcon icon={category.icon} />
                          <div>{category.name}</div>
                        </div>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              )}
              {currentMode === "show" && (
                <div>
                  <div className="flex items-center gap-2">
                    <CategoryIcon icon={subscription.category.icon} />
                    <div>{subscription.category.name}</div>
                  </div>
                </div>
              )}

              {/* Billing Cycle */}
              <label htmlFor="billing_cycle">Billing Cycle</label>
              {(currentMode === "add" || currentMode === "edit") && (
                <Listbox
                  value={selectedBillingCycle}
                  onChange={setSelectedBillingCycle}
                  as="div"
                  name="billingCycle"
                >
                  <Listbox.Button>per {selectedBillingCycle}</Listbox.Button>

                  <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto  rounded-md bg-white p-4 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {billingCycles.map((cycle) => (
                      <Listbox.Option
                        key={cycle}
                        value={cycle}
                        className="cursor-pointer p-2 hover:bg-gray-100"
                      >
                        per {cycle}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              )}
              {currentMode === "show" && <div>per {subscription.interval}</div>}
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={handleDeleteSubscription}>Delete</button>
              <button onClick={() => setCurrentMode("edit")}>Edit</button>

              {/* Needs to be made nicer */}
              {currentMode === "edit" && (
                <>
                  <button onClick={handleSaveEditSubscription}>Save</button>
                  <button onClick={() => setCurrentMode("show")}>Cancel</button>
                </>
              )}

              <button
                className="button-white-white-instance rounded-md border border-gray-300 bg-white px-4 py-2"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="button-white-white-instance rounded-md bg-blue-500 px-4 py-2 text-white"
                onClick={handleAddSubscription}
              >
                Add
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

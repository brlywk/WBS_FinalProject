import { useState, Fragment, forwardRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RadioGroup } from '@headlessui/react';
import eventEmitter from "../utils/EventEmitter"; // Event emitter for handling events
import { useDataContext } from "../contexts/dataContext"; // Context for data
import axios from 'axios'; // Axios for making HTTP requests
import { createUsageBody } from '../utils/schemaBuilder'; // Helper function to create request body

// UsageTab now expects a subscriptions prop
const Usage = forwardRef((props, ref) => {
    const { subscriptions } = useDataContext(); // Get subscriptions from context
    const [selected, setSelected] = useState();  // State for selected option
    const [subscriptionIndex, setSubscriptionIndex] = useState(0); // Index of the current subscription
    const [isOpen, setIsOpen] = useState(true); // State for modal open/close
    const [ratedSubscriptions, setRatedSubscriptions] = useState([]); // Array of rated subscriptions

    // Effect to open modal on event
    useEffect(() => {
        const openModal = () => {
            setIsOpen(true); // Open the modal
        };
        eventEmitter.on('openSubscriptionForm', openModal); // Listen for the event to open the modal
        return () => {
            eventEmitter.off('openSubscriptionForm', openModal); // Clean up listener on unmount
        };
    }, []);

    // Handler for selection change
    const handleSelection = (value) => {
        let score; // Score for the usage frequency
        // Assign score based on usage frequency
        switch (value) {
            case "Often": // If usage is often, score is 3 (like a high level demon in Demon Slayer)
                score = 3;
                break;
            case "Sometimes": // If usage is sometimes, score is 2 (like a mid level demon)
                score = 2;
                break;
            case "Rarely": // If usage is rarely, score is 1 (like a low level demon)
                score = 1;
                break;
            default: // If no usage, score is 0 (like a human)
                score = 0;
        }
        setSelected(value); // Set the selected value
        // Create the request body
        const usageBody = createUsageBody(subscriptions[subscriptionIndex]._id, score);
        // Post the usage data
        axios.post('/api/subscriptionUsage', usageBody)
            .then(response => {
                console.log('Usage data sent successfully:', response.data); // Log success
                // Add the rated subscription to the array
                setRatedSubscriptions([...ratedSubscriptions, subscriptions[subscriptionIndex]]);
                setSubscriptionIndex(subscriptionIndex + 1); // Move to the next subscription
                setSelected(null); // Reset the selected value
                // If all subscriptions have been rated, close the modal
                if (subscriptionIndex >= subscriptions.length - 1) {
                    setIsOpen(false);
                }
            })
            .catch(error => {
                console.error('Error sending usage data:', error); // Log error
            });
    };

    // If the current subscription has already been rated, move to the next one
    if (ratedSubscriptions.includes(subscriptions[subscriptionIndex])) {
        setSubscriptionIndex(subscriptionIndex + 1);
    }

  // Render the modal
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={isOpen}
        onClose={setIsOpen}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div ref={ref} className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              How often do you use {subscriptions[subscriptionIndex]?.name ?? 'Loading...'}?
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Don't think, just select!
              </p>
              <RadioGroup value={selected} onChange={handleSelection} className="mt-4">
                <RadioGroup.Option 
                  value="often"
                  className={({ checked }) => 
                    `bg-green-300 ${checked ? 'ring-green-600' : 'ring-green-200'}
                    mb-4 relative flex cursor-pointer rounded-lg px-4 py-3 shadow-md focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <RadioGroup.Label className={checked ? 'text-white' : 'text-gray-900'}>
                      Often
                    </RadioGroup.Label>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option
                  value="sometimes"
                  className={({ checked }) => 
                    `bg-orange-300 ${checked ? 'ring-2 ring-orange-500' : 'ring-orange-200'}
                    mb-4 rounded-lg px-4 py-3 shadow-md focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <RadioGroup.Label className={checked ? 'text-white' : 'text-gray-900'}>
                      Sometimes
                    </RadioGroup.Label>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option
                  value="rarely"
                  className={({ checked }) => 
                    `bg-red-300 ${checked ? 'ring-2 ring-red-500' : 'ring-red-200'}
                    rounded-lg px-4 py-3 shadow-md focus:outline-none`
                  }  
                >
                  {({ checked }) => (
                    <RadioGroup.Label className={checked ? 'text-white' : 'text-gray-900'}>
                      Rarely
                    </RadioGroup.Label>
                  )}
                </RadioGroup.Option>
              </RadioGroup>
              <button onClick={() => setIsOpen(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Done
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});

export default Usage;
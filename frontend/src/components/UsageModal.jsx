import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RadioGroup } from '@headlessui/react';

const defaultSubscription = {
    name: 'Netflix' 
  };
  
// UsageTab now expects a subscriptions prop
function UsageTab({ subscriptions = [] }) {

    const [selected, setSelected] = useState();  
    // If subscriptions is undefined, it defaults to an empty array
    // and subscription will be set to defaultSubscription
    const subscription = subscriptions?.[0] ?? defaultSubscription;
    const [isOpen, setIsOpen] = useState(true);

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
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              How often do you use {subscription?.name ?? 'Loading...'}?
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Don't think, just select!
              </p>
              <RadioGroup value={selected} onChange={setSelected} className="mt-4">
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
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default UsageTab;
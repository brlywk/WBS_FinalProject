import { useState } from 'react';
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

  return (
    <div className="container mx-auto px-48">
      <div className="mx-auto max-w-md">

        <h2 className="text-lg font-medium">
          How often do you use {subscription?.name ?? 'Loading...'}?
        </h2>

        <p className="mt-1 text-sm text-gray-500">
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
          {/* ... */}
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
          {/* ... */}
          </RadioGroup.Option>

        </RadioGroup>
      
      </div>
    </div>
  );
}


export default UsageTab;
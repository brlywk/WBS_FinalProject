import { useState } from 'react';
import { Dialog, Listbox } from '@headlessui/react';
import Input from './Input';
import DropdownTrigger from './DropdownTrigger';

const categories = [
  { id: 1, name: 'Entertainment' },
  { id: 2, name: 'Food' },
  { id: 3, name: 'Utilities' },
  { id: 4, name: 'Shopping' },
];

function AddSubscriptionForm({ open, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <Dialog className="fixed inset-0 flex items-center justify-center z-10" open={open} onClose={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur" />
      
      <Dialog.Panel className="bg-white p-4 rounded-lg z-20">        <div className="p-8 space-y-4">
          <Dialog.Title className="text-wrapper-32">Add Subscription</Dialog.Title>
          
          <Input placeholder="Subscription Name" className="form-item-input-instance" />
          
          <Input placeholder="Price" className="form-item-input-instance" />
          
          <Listbox value={selectedCategory} onChange={setSelectedCategory} as="div" className="field-2">
            <Listbox.Button className="dropdown-trigger-instance">{selectedCategory.name}</Listbox.Button>
            <Listbox.Options className="dropdown-menu-instance">
              {categories.map(category => (
                <Listbox.Option key={category.id} value={category} className="dropdown-menu-2">
                  {category.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
          
          <DropdownTrigger text="Billing Cycle" className="dropdown-trigger-2" />
          
          <div className="flex justify-end gap-4">
            <button 
              className="bg-white py-2 px-4 rounded-md border border-gray-300 button-white-white-instance"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md button-white-white-instance"
              onClick={onClose}  
            >
              Add
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export default AddSubscriptionForm;


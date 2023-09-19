// useDashboardToggles.js

import { useState } from 'react';

export default function useDashboardToggles() {
  // Define a custom hook that takes a name and initial state
  // Returns an array with the state and a function to toggle it
  const useToggle = (name, initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = () => setState(!state);
    return [state, toggle];
  }

  // Use the custom hook for each toggle state
  const [isMenuOpen, toggleMenu] = useToggle('menu');
  const [isOverlayOpen, toggleOverlay] = useToggle('overlay');
  const [isPopupOpen, togglePopup] = useToggle('popup');

  // Return the states and toggle functions
  return {
    isMenuOpen, 
    toggleMenu,
    isOverlayOpen,
    toggleOverlay,
    isPopupOpen,
    togglePopup,
  }
}
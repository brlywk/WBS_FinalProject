import { createContext, useState, useContext } from "react";

// Data Context for App
export const DataContext = createContext(null);

// Data Context Provider
export default function DataContextProvider({ children }) {
  // ---- DATA STATES ----
  const [subscriptions, setSubscriptions] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const [usedCategories, setUsedCategories] = useState(null);
  const [usages, setUsages] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  return (
    <DataContext.Provider
      value={{
        subscriptions,
        setSubscriptions,
        allCategories,
        setAllCategories,
        usedCategories,
        setUsedCategories,
        usages,
        setUsages,
        dashboardData,
        setDashboardData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// Data Context Hook
export function useDataContext() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }

  return context;
}

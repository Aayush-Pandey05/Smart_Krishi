// src/store/useDataStore.js

import { create } from "zustand";

// Define a default "skeleton" object for your user data.
// This prevents errors and shows loading states in the UI.
const defaultUserData = [
  {
    district: "Loading...",
    latitude: 12.9716, // Default to Bengaluru
    longitude: 77.5946,
    area: "---",
    gwl: "---",
    water_requirement: "---",
    annual_savings_inr: "---",
  },
];

export const useDataStore = create((set) => ({
  // Use the default data as the initial state
  userData: defaultUserData,

  // Start in a loading state
  isLoadingData: true,

  // This function will fetch real data and REPLACE the default data
  fetchUserData: async () => {
    // Ensure loading state is true at the start of a fetch
    set({ isLoadingData: true });

    // Simulate fetching data from your backend
    setTimeout(() => {
      // This is where you would fetch your real backend data.
      // For now, we use mock data that will overwrite the defaults.
      const backendData = [
        {
          district: "Bengaluru Urban",
          latitude: 12.9716,
          longitude: 77.5946,
          area: 15000,
          gwl: 12.5,
          water_requirement: 25000,
          annual_savings_inr: 45000,
        },
      ];

      // Update the store with the fetched data and set loading to false
      set({ userData: backendData, isLoadingData: false });
      console.log("✅ Backend data fetched and updated:", backendData);
    }, 2000); // 2-second delay to simulate network request
  },
}));

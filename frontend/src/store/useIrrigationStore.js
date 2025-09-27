import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useIrrigationStore = create((set, get) => ({
  // State
  irrigationHistory: [],
  currentAdvice:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("currentAdvice") || "null")
      : null,
  userStats: null,
  isGeneratingAdvice: false,
  isLoadingHistory: false,
  isLoadingStats: false,
  error: null,

  // Generate irrigation advice
  generateIrrigationAdvice: async (adviceData) => {
    // Clear previous advice when generating new one
    get().clearCurrentAdvice();
    set({ isGeneratingAdvice: true, error: null });
    try {
      const { authUser } = useAuthStore.getState();

      if (!authUser?._id) {
        toast.error("Please log in to get irrigation advice");
        return { success: false };
      }

      const res = await axiosInstance.post("/irrigation", adviceData);

      if (res.data.success) {
        // Save to localStorage for persistence across page reloads
        if (typeof window !== "undefined") {
          localStorage.setItem("currentAdvice", JSON.stringify(res.data.data));
        }

        set({
          currentAdvice: res.data.data,
          error: null,
        });

        toast.success("Irrigation advice generated successfully!");

        // Refresh user data to get the updated history
        get().getUserIrrigationHistory();

        return { success: true, data: res.data.data };
      } else {
        throw new Error(res.data.message || "Failed to generate advice");
      }
    } catch (error) {
      console.error("Error generating irrigation advice:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to generate irrigation advice";
      set({ error: errorMessage });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isGeneratingAdvice: false });
    }
  },

  // Get user's irrigation history
  getUserIrrigationHistory: async (page = 1, limit = 10) => {
    set({ isLoadingHistory: true, error: null });
    try {
      const { authUser } = useAuthStore.getState();

      if (!authUser?._id) {
        set({ irrigationHistory: [] });
        return;
      }

      const res = await axiosInstance.get(
        `/irrigation/history?page=${page}&limit=${limit}`
      );

      if (res.data.success) {
        set({
          irrigationHistory: res.data.data,
          error: null,
        });
        return {
          success: true,
          data: res.data.data,
          pagination: res.data.pagination,
        };
      } else {
        throw new Error(
          res.data.message || "Failed to fetch irrigation history"
        );
      }
    } catch (error) {
      console.error("Error fetching irrigation history:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch irrigation history";
      set({ error: errorMessage, irrigationHistory: [] });
      return { success: false, error: errorMessage };
    } finally {
      set({ isLoadingHistory: false });
    }
  },

  // Get specific irrigation details
  getIrrigationDetails: async (irrigationId) => {
    try {
      const res = await axiosInstance.get(
        `/irrigation/details/${irrigationId}`
      );

      if (res.data.success) {
        return { success: true, data: res.data.data };
      } else {
        throw new Error(
          res.data.message || "Failed to fetch irrigation details"
        );
      }
    } catch (error) {
      console.error("Error fetching irrigation details:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch irrigation details";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Get user's irrigation statistics
  getUserStats: async () => {
    set({ isLoadingStats: true, error: null });
    try {
      const { authUser } = useAuthStore.getState();

      if (!authUser?._id) {
        set({ userStats: null });
        return;
      }

      const res = await axiosInstance.get("/irrigation/stats");

      if (res.data.success) {
        set({
          userStats: res.data.data,
          error: null,
        });
        return { success: true, data: res.data.data };
      } else {
        throw new Error(res.data.message || "Failed to fetch user statistics");
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch user statistics";
      set({ error: errorMessage, userStats: null });
      return { success: false, error: errorMessage };
    } finally {
      set({ isLoadingStats: false });
    }
  },

  // Get latest recommendation (for showing on dashboard)
  getLatestRecommendation: () => {
    const state = get();
    if (state.irrigationHistory.length > 0) {
      return state.irrigationHistory[0]; // Most recent advice
    }
    return state.currentAdvice;
  },

  // Clear current advice
  clearCurrentAdvice: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentAdvice");
    }
    set({ currentAdvice: null, error: null });
  },

  // Clear all data (for logout)
  clearAllData: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentAdvice");
    }
    set({
      irrigationHistory: [],
      currentAdvice: null,
      userStats: null,
      error: null,
      isGeneratingAdvice: false,
      isLoadingHistory: false,
      isLoadingStats: false,
    });
  },

  // Reset error state
  clearError: () => {
    set({ error: null });
  },
}));

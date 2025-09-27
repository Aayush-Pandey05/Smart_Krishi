import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useFormStore = create((set, get) => ({
  // State
  userDiseaseData: [],
  isUploading: false,
  isLoadingData: false,
  currentPrediction: null,
  currentRecommendation: null,

  // Actions
  uploadImage: async (file) => {
    set({ isUploading: true });
    try {
      const { authUser } = useAuthStore.getState();
      
      if (!authUser?._id) {
        toast.error("Please log in to upload images");
        return { success: false };
      }

      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', authUser._id);

      // Send image to your backend processing route
      const res = await axiosInstance.post("/processing", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        set({ 
          currentPrediction: res.data.data.topPrediction,
          currentRecommendation: res.data.data.aiRecommendation 
        });

        toast.success("Disease detected successfully!");
        
        // Refresh user data to get the latest entry
        get().getUserDiseaseData();
        
        return { success: true, data: res.data.data };
      } else {
        throw new Error(res.data.message || "Detection failed");
      }
    } catch (error) {
      console.log("Error in uploadImage: ", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to detect disease";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isUploading: false });
    }
  },

  getUserDiseaseData: async () => {
    set({ isLoadingData: true });
    try {
      const { authUser } = useAuthStore.getState();
      
      if (!authUser?._id) {
        console.log("No authenticated user found");
        set({ userDiseaseData: [] });
        return { success: false };
      }

      // Get user's detection history
      const res = await axiosInstance.get(`/processing/history/${authUser._id}?limit=10`);
      
      if (res.data.success) {
        const historyData = res.data.data || [];
        set({ userDiseaseData: historyData });
        
        // Set the latest prediction and recommendation if available
        if (historyData.length > 0) {
          const latest = historyData[0]; // Most recent first
          set({ 
            currentPrediction: latest.topPrediction,
            currentRecommendation: latest.aiRecommendation 
          });
        }
        
        return { success: true };
      } else {
        set({ userDiseaseData: [] });
        return { success: false };
      }
    } catch (error) {
      console.log("Error in getUserDiseaseData: ", error);
      set({ userDiseaseData: [] });
      return { success: false };
    } finally {
      set({ isLoadingData: false });
    }
  },

  getDetectionDetails: async (detectionId) => {
    try {
      const { authUser } = useAuthStore.getState();
      
      if (!authUser?._id) {
        return { success: false };
      }

      const res = await axiosInstance.get(`/processing/detection/${detectionId}?userId=${authUser._id}`);
      
      if (res.data.success) {
        return { success: true, data: res.data.data };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.log("Error in getDetectionDetails: ", error);
      return { success: false };
    }
  },

  getUserStats: async () => {
    try {
      const { authUser } = useAuthStore.getState();
      
      if (!authUser?._id) {
        return { success: false };
      }

      const res = await axiosInstance.get(`/processing/stats/${authUser._id}`);
      
      if (res.data.success) {
        return { success: true, data: res.data.data };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.log("Error in getUserStats: ", error);
      return { success: false };
    }
  },

  clearCurrentData: () => {
    set({ 
      currentPrediction: null, 
      currentRecommendation: null 
    });
  },

  // Helper to get latest disease data
  getLatestDisease: () => {
    const { userDiseaseData } = get();
    return userDiseaseData && userDiseaseData.length > 0 ? userDiseaseData[0] : null;
  },

  // Helper to check if user has any disease data
  hasUserData: () => {
    const { userDiseaseData } = get();
    return userDiseaseData && userDiseaseData.length > 0;
  },
}));
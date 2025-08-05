import {
  completeHelp,
  getHelpById,
  getHelpForVolunteer,
  getPatientHelpHistory,
  getRunningServices,
  getServiceHistory,
  seekHelp,
  updateHelpStatus,
} from "../models/help.model.js";

export const seekHelpController = async (req, res) => {
  try {
    const { latitude, longitude, patient_id } = req.body;

    // Fetch availability from the database
    const result = await seekHelp(latitude, longitude, patient_id);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHelpForVolunteerController = async (req, res) => {
  try {
    const volunteerId = req.user?.id;

    if (!volunteerId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required: No volunteer ID found",
      });
    }

    const result = await getHelpForVolunteer(volunteerId);

    // Handle different types of responses from the service
    if (result?.error) {
      return res.status(404).json({
        success: false,
        message: result.error,
      });
    }

    if (result?.message) {
      return res.status(200).json({
        success: true,
        message: result.message,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Help requests retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in getHelpForVolunteerController:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const updateHelpStatusController = async (req, res) => {
  try {
    const { helpId, volunteerId } = req.body;

    // Fetch availability from the database
    const result = await updateHelpStatus(helpId, volunteerId);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const completeHelpController = async (req, res) => {
  try {
    const { helpId, volunteerId } = req.body;

    // Fetch availability from the database
    const result = await completeHelp(helpId, volunteerId);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getHelpByIdController = async (req, res) => {
  try {
    const { helpId, status } = req.params;

    // Fetch availability from the database
    const result = await getHelpById(helpId, status);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRunningServicesController = async (req, res) => {
  try {
    const volunteerId = req.user?.id;

    // Fetch availability from the database
    const result = await getRunningServices(volunteerId);

    console.log(result);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getServiceHistoryController = async (req, res) => {
  try {
    const volunteerId = req.user?.id;

    // Fetch availability from the database
    const result = await getServiceHistory(volunteerId);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPatientHelpHistoryController = async (req, res) => {
  try {
    const p_id = req.user?.id;

    // Fetch availability from the database
    const result = await getPatientHelpHistory(p_id);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

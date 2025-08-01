import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getApiUrl, getAuthHeaders, API_ENDPOINTS } from "../../config/api";
import { getImageUrl, handleImageError } from "../../utils/imageUtils";

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [techInput, setTechInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [technologies, setTechnologies] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (project) {
      // Populate form with existing project data
      reset({
        title: project.title,
        description: project.description,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        featured: project.featured,
        order: project.order,
      });
      setTechnologies(project.technologies || []);
      // Set image preview if project has an image
      if (project.image) {
        setImagePreview(getImageUrl(project.image));
      }
    } else {
      // Reset form for new project
      reset({
        title: "",
        description: "",
        image: "",
        liveUrl: "",
        githubUrl: "",
        featured: false,
        order: 0,
      });
      setTechnologies([]);
    }
  }, [project, reset]);

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTechnology = (index) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(
        getApiUrl(API_ENDPOINTS.UPLOAD_IMAGE),
        formData,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        return response.data.file.url;
      }
      throw new Error(response.data.error || "Upload failed");
    } catch (error) {
      console.error("Image upload error:", error);
      throw new Error(error.response?.data?.error || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      // Upload image if a new file is selected
      let imageUrl = imagePreview;
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const projectData = {
        ...data,
        image: imageUrl,
        technologies,
        featured: data.featured || false,
        order: parseInt(data.order) || 0,
      };

      let response;
      if (project) {
        // Update existing project
        response = await axios.put(
          getApiUrl(API_ENDPOINTS.PROJECT_BY_ID(project.id)),
          projectData,
          { headers: getAuthHeaders() }
        );
      } else {
        // Create new project
        response = await axios.post(
          getApiUrl(API_ENDPOINTS.PROJECTS),
          projectData,
          {
            headers: getAuthHeaders(),
          }
        );
      }

      if (response.data.success) {
        onSave();
      }
    } catch (error) {
      console.error("Error saving project:", error);
      setError(error.response?.data?.error || "Failed to save project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Project Title *
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter project title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description *
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe your project"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Project Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Image
          </label>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-4">
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Project preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300"
                  onError={handleImageError}
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* File Upload */}
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {uploadingImage && (
              <div className="text-sm text-blue-600">Uploading...</div>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Supported formats: JPG, PNG, GIF. Max size: 5MB
          </p>
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Technologies
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTechnology())
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add technology (e.g., React, Node.js)"
            />
            <button
              type="button"
              onClick={addTechnology}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(index)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* URLs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="liveUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Live Demo URL
            </label>
            <input
              {...register("liveUrl")}
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://your-project.com"
            />
          </div>

          <div>
            <label
              htmlFor="githubUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              GitHub URL
            </label>
            <input
              {...register("githubUrl")}
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input
                {...register("featured")}
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Featured Project
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Featured projects appear in the main section
            </p>
          </div>

          <div>
            <label
              htmlFor="order"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Display Order
            </label>
            <input
              {...register("order")}
              type="number"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">
              Lower numbers appear first
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </div>
            ) : project ? (
              "Update Project"
            ) : (
              "Create Project"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;

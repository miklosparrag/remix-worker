import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  type UploadOptions,
} from "@imagekit/react";
import { type AuthParams } from "~/routes/api/imagekit-sign";
import { useRef, useState } from "react";

type UploadTransformations = {
  [key: string]: UploadOptions["transformation"];
};

const UPLOAD_TRASFORMATIONS = {
  standard_face: {
    pre: "w-1200,h-1200,c-at_max", // reduce size before upload to deal with large files
    post: [{ type: "transformation", value: "tr:fo-face,z0.7" }],
  },
  bgRemove: {
    pre: "w-1200,h-1200,c-at_max",
    post: [{ type: "transformation", value: "tr:fo-face,z0.7,e-bgremove" }],
  },
} satisfies UploadTransformations;

// UploadExample component demonstrates file uploading using ImageKit's React SDK.
export const ImageKitUploadForm = () => {
  // State to keep track of the current upload progress (percentage)
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);

  // Create a ref for the file input element to access its files easily
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create an AbortController instance to provide an option to cancel the upload if needed.
  const abortController = new AbortController();

  /**
   * Authenticates and retrieves the necessary upload credentials from the server.
   *
   * This function calls the authentication API endpoint to receive upload parameters like signature,
   * expire time, token, and publicKey.
   *
   * @returns {Promise<{signature: string, expire: string, token: string, publicKey: string}>} The authentication parameters.
   * @throws {Error} Throws an error if the authentication request fails.
   */
  const authenticator = async (): Promise<AuthParams> => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch("/api/imagekit-sign");
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      // Parse and destructure the response JSON for upload credentials.
      const data: AuthParams = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  /**
   * Handles the file upload process.
   *
   * This function:
   * - Validates file selection.
   * - Retrieves upload authentication credentials.
   * - Initiates the file upload via the ImageKit SDK.
   * - Updates the upload progress.
   * - Catches and processes errors accordingly.
   */
  const handleUpload = async () => {
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    // Extract the first file from the file input
    const file = fileInput.files[0];

    // Retrieve authentication parameters for the upload.
    let authParams: AuthParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file,
        webhookUrl: "https://shopitest.parrag.net/api/imagekit-hook",
        fileName: file.name, // Optionally set a custom file name
        // Progress callback to update upload progress state
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        // Abort signal to allow cancellation of the upload if needed.
        abortSignal: abortController.signal,
        transformation: UPLOAD_TRASFORMATIONS.standard_face,
      });
      console.log("Upload response:", uploadResponse);
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <>
      {/* File input element using React ref */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setPreview(URL.createObjectURL(e.target.files[0]));
          } else {
            setPreview(null);
          }
        }}
      />
      {preview && (
        <div className="max-w-2xs max-h-2xs">
          <img width={200} src={preview} alt="Preview" />
        </div>
      )}
      {/* Button to trigger the upload process */}
      <button type="button" onClick={handleUpload}>
        Upload file
      </button>
      <br />
      {/* Display the current upload progress */}
      Upload progress: <progress value={progress} max={100}></progress>
    </>
  );
};

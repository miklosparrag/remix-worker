import { Form } from "@remix-run/react";
import { TypedResponse } from "@remix-run/server-runtime";

export function CloudinaryUploadForm() {
  return (
    <div>
      <h1>Upload a File</h1>
      <Form
        method="post"
        encType="multipart/form-data"
        onSubmit={async (e) => {
          const base_formData = new FormData(e.currentTarget);
          const file = base_formData.get("upload_file");
          e.preventDefault();
          if (!file) return;

          let formData = new FormData();

          //formData.append("public_id", "test_image")
          formData.append("asset_folder", "tests");

          try {
            let response: TypedResponse<{ [index: string]: string }> =
              await fetch("/api/cloudinary-sign", {
                method: "POST",
                body: formData,
              });
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }

            let json = await response.json();

            formData = new FormData();

            for (const key in json) {
              if (key !== "url") {
                formData.append(key, json[key]);
              }
            }
            formData.append("file", file);
            response = await fetch(json.url, {
              method: "POST",
              body: formData,
            });

            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }

            json = await response.json();
            console.log(json);
          } catch (error) {
            if (error instanceof Error) console.error(error.message);
          }
        }}
      >
        <input id="upload_file" type="file" color="sky" name="upload_file" />
        <button type="submit" color="sky">
          Upload
        </button>
      </Form>
    </div>
  );
}

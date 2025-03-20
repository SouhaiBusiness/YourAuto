// This function will upload an image to Cloudinary and return the URL
export async function uploadToCloudinary(file: File) {
    try {
      // Create a FormData object to send the file
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "car-rental") // You'll need to create this in Cloudinary
  
      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      )
  
      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary")
      }
  
      const data = await response.json()
      return data.secure_url
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error)
      throw error
    }
  }
  
  
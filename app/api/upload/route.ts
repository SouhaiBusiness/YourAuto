import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
    }

    // Log environment variables (without exposing sensitive data)
    console.log("Cloudinary cloud name available:", !!process.env.CLOUDINARY_CLOUD_NAME)

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return NextResponse.json(
        {
          success: false,
          error: "Cloudinary configuration missing",
        },
        { status: 500 },
      )
    }

    // Create a FormData object to send to Cloudinary
    const cloudinaryFormData = new FormData()
    cloudinaryFormData.append("file", file)

    // Use unsigned upload - no need for upload_preset
    // We'll use the Cloudinary URL with your cloud name
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`

    // For debugging
    console.log("Uploading to Cloudinary URL:", cloudinaryUrl)

    // Convert file to ArrayBuffer for upload
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Use fetch with a more direct approach
    const cloudinaryResponse = await fetch(cloudinaryUrl, {
      method: "POST",
      body: cloudinaryFormData,
    })

    if (!cloudinaryResponse.ok) {
      const errorText = await cloudinaryResponse.text()
      console.error("Cloudinary error:", errorText)
      return NextResponse.json(
        {
          success: false,
          error: `Cloudinary upload failed: ${cloudinaryResponse.status} ${cloudinaryResponse.statusText}`,
          details: errorText,
        },
        { status: 500 },
      )
    }

    const data = await cloudinaryResponse.json()

    return NextResponse.json({
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
    })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to upload image",
      },
      { status: 500 },
    )
  }
}


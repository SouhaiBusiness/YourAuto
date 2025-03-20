/**
 * Converts a File object to a base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }
  
  /**
   * Creates an object URL from a base64 string
   */
  export const base64ToObjectUrl = (base64: string): string => {
    try {
      // Extract the base64 data from the data URL
      const base64Data = base64.split(",")[1]
      if (!base64Data) return ""
  
      // Determine the MIME type from the data URL
      const mimeMatch = base64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/)
      const mime = mimeMatch ? mimeMatch[1] : "image/jpeg"
  
      // Convert base64 to binary
      const binaryStr = atob(base64Data)
      const len = binaryStr.length
      const bytes = new Uint8Array(len)
  
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryStr.charCodeAt(i)
      }
  
      // Create a blob and object URL
      const blob = new Blob([bytes], { type: mime })
      return URL.createObjectURL(blob)
    } catch (error) {
      console.error("Error converting base64 to object URL:", error)
      return ""
    }
  }
  
  
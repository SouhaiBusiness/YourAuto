"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Plus, Upload, Pencil, Trash2, X, Check, AlertCircle } from "lucide-react"
import { Pagination } from "@/components/ui/pagination"
import Image from "next/image"

// Define simplified UI components directly in this file to avoid import issues
const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`rounded-lg border bg-white text-gray-900 shadow-sm ${className || ""}`} {...props} />
)

const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className || ""}`} {...props} />
)

const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className || ""}`} {...props} />
)

const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`text-sm text-gray-500 ${className || ""}`} {...props} />
)

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pt-0 ${className || ""}`} {...props} />
)

const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex items-center p-6 pt-0 ${className || ""}`} {...props} />
)

const Button = ({
  className,
  disabled,
  type = "button",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className || ""}`}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
)

const Label = ({
  className,
  htmlFor,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { htmlFor?: string }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ""}`}
    {...props}
  >
    {children}
  </label>
)

const Input = ({ className, type = "text", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
    {...props}
  />
)

const Select = ({ className, children, value, onChange, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
    value={value}
    onChange={onChange}
    {...props}
  >
    {children}
  </select>
)

// Modal component for edit/delete confirmations
const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto">
        <div className="relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
          {children}
        </div>
      </div>
    </div>
  )
}

interface Car {
  _id: string
  name: string
  price: number
  carBrand: string
  carType: string
  seats: number
  carAvg: number
  image: {
    url: string
  }
  createdAt: string
}

export default function CarManagement() {
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [cars, setCars] = useState<Car[]>([])
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    carBrand: "",
    carType: "",
    seats: "",
    carAvg: "",
    imageUrl: "",
  })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit] = useState(6) // Number of cars per page in dashboard

  // State for edit/delete modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    carBrand: "",
    carType: "",
    seats: "",
    carAvg: "",
    imageUrl: "",
  })
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingEditImage, setUploadingEditImage] = useState(false)

  const carBrands = ["Mercedes", "BMW", "Suzuki", "Renault", "Peugeot", "Mazda", "Audi", "Yamaha", "Kawazaki", "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Hyundai", "Kia", "Dacia"]

  const carTypes = ["Sedan", "SUV", "Car", "Moto", "Quad", "Scooter", "Coupe", "Convertible", "Hatchback", "Wagon", "Van", "Truck"]

  // Fetch cars on component mount and when page changes
  useEffect(() => {
    fetchCars()
  }, [currentPage])

  const fetchCars = async () => {
    try {
      const response = await fetch(`/api/cars?page=${currentPage}&limit=${limit}`)
      const data = await response.json()

      if (data.carsList) {
        setCars(data.carsList)
        setTotalPages(data.pagination?.totalPages || 1)
      }
    } catch (error) {
      console.error("Error fetching cars:", error)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Create a temporary preview
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)

      // Convert file to base64
      setUploadingImage(true)
      try {
        // Read the file as base64
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const base64String = reader.result as string
          setFormData((prev) => ({ ...prev, imageUrl: base64String }))
          setUploadingImage(false)
        }
        reader.onerror = (error) => {
          console.error("Error reading file:", error)
          alert("Failed to process image. Please try again.")
          setUploadingImage(false)
        }
      } catch (error) {
        console.error("Error processing image:", error)
        alert("Failed to process image. Please try again.")
        setUploadingImage(false)
      }
    }
  }

  const handleEditImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Create a temporary preview
      const previewUrl = URL.createObjectURL(file)
      setEditImagePreview(previewUrl)

      // Convert file to base64
      setUploadingEditImage(true)
      try {
        // Read the file as base64
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const base64String = reader.result as string
          setEditFormData((prev) => ({ ...prev, imageUrl: base64String }))
          setUploadingEditImage(false)
        }
        reader.onerror = (error) => {
          console.error("Error reading file:", error)
          alert("Failed to process image. Please try again.")
          setUploadingEditImage(false)
        }
      } catch (error) {
        console.error("Error processing image:", error)
        alert("Failed to process image. Please try again.")
        setUploadingEditImage(false)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Check if image is uploaded
      if (!formData.imageUrl) {
        throw new Error("Please upload an image for the car")
      }

      const response = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        alert("Car has been added successfully.")

        // Reset form
        setFormData({
          name: "",
          price: "",
          carBrand: "",
          carType: "",
          seats: "",
          carAvg: "",
          imageUrl: "",
        })
        setImagePreview(null)

        // Refresh car list
        fetchCars()
      } else {
        throw new Error(data.error || "Failed to add car")
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to add car. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const openEditModal = (car: Car) => {
    setSelectedCar(car)
    setEditFormData({
      name: car.name,
      price: car.price.toString(),
      carBrand: car.carBrand,
      carType: car.carType,
      seats: car.seats.toString(),
      carAvg: car.carAvg.toString(),
      imageUrl: car.image?.url || "",
    })
    setEditImagePreview(car.image?.url || null)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (car: Car) => {
    setSelectedCar(car)
    setIsDeleteModalOpen(true)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCar) return

    setIsLoading(true)

    try {
      // Check if image is uploaded
      if (!editFormData.imageUrl) {
        throw new Error("Please upload an image for the car")
      }

      const response = await fetch(`/api/cars/${selectedCar._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      })

      const data = await response.json()

      if (data.success) {
        alert("Car has been updated successfully.")
        setIsEditModalOpen(false)
        fetchCars()
      } else {
        throw new Error(data.error || "Failed to update car")
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to update car. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedCar) return

    setIsLoading(true)

    try {
      const response = await fetch(`/api/cars/${selectedCar._id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        alert("Car has been deleted successfully.")
        setIsDeleteModalOpen(false)

        // If we're on a page with only one item and it's not the first page,
        // go to the previous page after deletion
        if (cars.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1)
        } else {
          fetchCars()
        }
      } else {
        throw new Error(data.error || "Failed to delete car")
      }
    } catch (error) {
      alert("Failed to delete car. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Car Management</h1>
      </div>

      {/* Car List */}
      <Card>
        <CardHeader>
          <CardTitle>Car Inventory</CardTitle>
          <CardDescription>Manage your car rental fleet. Edit or delete existing cars.</CardDescription>
        </CardHeader>
        <CardContent>
          {cars.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No cars in inventory. Add your first car below.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium">Image</th>
                      <th className="py-3 px-4 text-left font-medium">Name</th>
                      <th className="py-3 px-4 text-left font-medium">Brand</th>
                      <th className="py-3 px-4 text-left font-medium">Type</th>
                      <th className="py-3 px-4 text-left font-medium">Price/Day</th>
                      <th className="py-3 px-4 text-left font-medium">Seats</th>
                      <th className="py-3 px-4 text-left font-medium">MPG</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars.map((car) => (
                      <tr key={car._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          {car.image?.url ? (
                            <img
                              src={car.image.url || "/placeholder.svg"}
                              alt={car.name}
                              className="w-16 h-12 object-contain"
                              onError={(e) => {
                                // Fallback if image fails to load
                                ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=48&width=64"
                              }}
                            />
                          ) : (
                            <div className="w-16 h-12 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                              No Image
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">{car.name}</td>
                        <td className="py-3 px-4">{car.carBrand}</td>
                        <td className="py-3 px-4">{car.carType}</td>
                        <td className="py-3 px-4">${car.price}/day</td>
                        <td className="py-3 px-4">{car.seats}</td>
                        <td className="py-3 px-4">{car.carAvg}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openEditModal(car)}
                              className="p-1 text-blue-500 hover:text-blue-700"
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(car)}
                              className="p-1 text-red-500 hover:text-red-700"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination for dashboard */}
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
        </CardContent>
      </Card>

      {/* Add New Car Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Car</CardTitle>
          <CardDescription>Fill in the details to add a new car to your rental fleet.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Car Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Mercedes C-Class"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price per Day ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="e.g. 100"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="carBrand">Car Brand</Label>
                <Select id="carBrand" name="carBrand" value={formData.carBrand} onChange={handleChange} required>
                  <option value="">Select brand</option>
                  {carBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="carType">Car Type</Label>
                <Select id="carType" name="carType" value={formData.carType} onChange={handleChange} required>
                  <option value="">Select type</option>
                  {carTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seats">Number of Seats</Label>
                <Input
                  id="seats"
                  name="seats"
                  type="number"
                  placeholder="e.g. 5"
                  value={formData.seats}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="carAvg">Average MPG</Label>
                <Input
                  id="carAvg"
                  name="carAvg"
                  type="number"
                  placeholder="e.g. 30"
                  value={formData.carAvg}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Car Image</Label>
              <div className="flex flex-col items-center gap-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-full flex flex-col items-center justify-center">
                  <input type="file" id="image" className="hidden" accept="image/*" onChange={handleImageChange} />
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center cursor-pointer w-full h-40"
                  >
                    {imagePreview ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Car preview"
                          className="max-h-40 object-contain"
                        />
                        {uploadingImage && (
                          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Click to upload car image</p>
                      </>
                    )}
                  </label>
                </div>
                {formData.imageUrl && (
                  <div className="text-sm text-green-600 flex items-center">
                    <Check className="h-4 w-4 mr-1" /> Image uploaded successfully
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isLoading || uploadingImage || !formData.imageUrl}
              className="w-full md:w-auto"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Car
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Car</h2>
          <form onSubmit={handleEditSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Car Name</Label>
                <Input id="edit-name" name="name" value={editFormData.name} onChange={handleEditChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-price">Price per Day ($)</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  value={editFormData.price}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-carBrand">Car Brand</Label>
                <Select
                  id="edit-carBrand"
                  name="carBrand"
                  value={editFormData.carBrand}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">Select brand</option>
                  {carBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-carType">Car Type</Label>
                <Select
                  id="edit-carType"
                  name="carType"
                  value={editFormData.carType}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">Select type</option>
                  {carTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-seats">Number of Seats</Label>
                <Input
                  id="edit-seats"
                  name="seats"
                  type="number"
                  value={editFormData.seats}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-carAvg">Average MPG</Label>
                <Input
                  id="edit-carAvg"
                  name="carAvg"
                  type="number"
                  value={editFormData.carAvg}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-image">Car Image</Label>
                <div className="flex flex-col items-center gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-full flex flex-col items-center justify-center">
                    <input
                      type="file"
                      id="edit-image"
                      className="hidden"
                      accept="image/*"
                      onChange={handleEditImageChange}
                    />
                    <label
                      htmlFor="edit-image"
                      className="flex flex-col items-center justify-center cursor-pointer w-full h-40"
                    >
                      {editImagePreview ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={editImagePreview || "/placeholder.svg"}
                            alt="Car preview"
                            className="max-h-40 object-contain"
                          />
                          {uploadingEditImage && (
                            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload car image</p>
                        </>
                      )}
                    </label>
                  </div>
                  {editFormData.imageUrl && (
                    <div className="text-sm text-green-600 flex items-center">
                      <Check className="h-4 w-4 mr-1" /> Image uploaded successfully
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <Button
                type="button"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || uploadingEditImage || !editFormData.imageUrl}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="p-6">
          <div className="flex items-center gap-3 text-red-600 mb-4">
            <AlertCircle className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Delete Car</h2>
          </div>

          <p className="mb-4">
            Are you sure you want to delete <strong>{selectedCar?.name}</strong>? This action cannot be undone.
          </p>

          {selectedCar?.image?.url && (
            <div className="flex justify-center mb-4">
              <Image
                src={selectedCar.image.url || "/placeholder.svg"}
                alt={selectedCar.name}
                className="h-32 object-contain border rounded"
                onError={(e) => {
                  // Fallback if image fails to load
                  ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=128&width=128"
                }}
              />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              className="bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" className="bg-red-500 hover:bg-red-600" onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete Car"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}


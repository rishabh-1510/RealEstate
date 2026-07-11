'use client'
import { useState } from "react"
import Modal from "./Modal" // adjust path as needed
import { LuTriangleAlert } from "react-icons/lu"

interface DeletePropertyModalProps {
  isOpen: boolean
  onClose: () => void
  propertyTitle: string
  onConfirm: () => Promise<void> | void
}

const DeletePropertyModal = ({
  isOpen,
  onClose,
  propertyTitle,
  onConfirm,
}: DeletePropertyModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      await onConfirm()
      onClose();
    } catch (err) {
      console.error("Failed to delete property:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Property">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
          <LuTriangleAlert size={20} className="text-red-600" />
        </div>
        <div>
          <p className="text-sm text-gray-700">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">{propertyTitle}</span>?
          </p>
          <p className="mt-1 text-sm text-gray-500">
            This action cannot be undone.
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={isDeleting}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 cursor-pointer"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  )
}

export default DeletePropertyModal
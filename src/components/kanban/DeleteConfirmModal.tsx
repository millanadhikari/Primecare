"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  itemName: string;
}

export function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  itemName,
}: DeleteConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span>{title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-gray-600">{description}</p>

          <div className="bg-gray-50 p-3 rounded-md">
            <p className="font-medium text-gray-900">{itemName}</p>
          </div>

          <p className="text-sm text-red-600">This action cannot be undone.</p>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import React from "react";

export default function ConfirmModal({ title, onConfirm, onCancel }) {
  return (
    <div className="bg-white rounded-xl p-6 w-80 text-center space-y-6">
      <p className="text-lg">{title}</p>
      <div className="flex justify-end gap-3">
        <button onClick={onCancel} className="px-4 py-2 border rounded-md">
          Ні
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-md bg-primary text-white"
        >
          Так
        </button>
      </div>
    </div>
  );
}

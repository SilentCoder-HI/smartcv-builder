// components/Toast.tsx
"use client"

import { useEffect, useState } from "react"
import { CheckCircle, AlertCircle, Info, XCircle } from "lucide-react"
import clsx from "clsx"

type ToastType = "success" | "error" | "info" | "confirm"

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number // in ms
}

const icons = {
  success: <CheckCircle className="w-5 h-5" />,
  error: <XCircle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
  confirm: <AlertCircle className="w-5 h-5" />,
}

export const Toast = ({ message, type = "info", duration = 3000 }: ToastProps) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!show) return null

  return (
    <div className={clsx(
      "fixed top-4 right-4 flex items-center gap-2 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity",
      {
        "bg-blue-600": type === "info",
        "bg-green-600": type === "success",
        "bg-red-600": type === "error",
        "bg-yellow-600": type === "confirm",
      }
    )}>
      {icons[type]}
      <span>{message}</span>
    </div>
  )
}

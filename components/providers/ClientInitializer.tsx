"use client"

import { useEffect, type ReactNode } from "react"
import { useDispatch } from "react-redux"
import { resetTemplate } from "@/store/templateSlice"
import { resetCV } from "@/store/cvslice" // Add other resets if needed

interface Props {
  children: ReactNode
}

export default function ClientInitializer({ children }: Props) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetTemplate())
    dispatch(resetCV())
  }, [])

  return <>{children}</> // ✅ Render children properly
}

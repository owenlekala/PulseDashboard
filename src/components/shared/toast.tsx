"use client"

import { toast as sonnerToast } from "sonner"

export const toast = {
  success: (message: string, description?: string) => {
    return sonnerToast.success(message, {
      description,
      duration: 4000,
    })
  },
  error: (message: string, description?: string) => {
    return sonnerToast.error(message, {
      description,
      duration: 5000,
    })
  },
  warning: (message: string, description?: string) => {
    return sonnerToast.warning(message, {
      description,
      duration: 4000,
    })
  },
  info: (message: string, description?: string) => {
    return sonnerToast.info(message, {
      description,
      duration: 4000,
    })
  },
  loading: (message: string) => {
    return sonnerToast.loading(message)
  },
  promise: <T,>(
    promise: Promise<T>,
    options: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: unknown) => string)
    }
  ) => {
    return sonnerToast.promise(promise, options)
  },
  dismiss: (toastId?: string | number) => {
    sonnerToast.dismiss(toastId)
  },
}


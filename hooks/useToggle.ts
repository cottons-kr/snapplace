import { useState } from 'react'

export type ToggleProvider = ReturnType<typeof useToggle>

export function useToggle() {
  const [isOpen, setOpen] = useState(false)

  return {
    isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
  }
}

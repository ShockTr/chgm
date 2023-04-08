import { useState, useEffect } from 'react'

export function useSavedState<T extends object>(key: string, initialState: T, loadStateIfAvailable = true) {
    const [internalState, setInternalState] = useState<T>(() => {
        if (loadStateIfAvailable) {
            const savedState = typeof localStorage !== 'undefined' && localStorage.getItem(key)
            if (savedState) {
                return JSON.parse(savedState)
            }
        }
        return initialState
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(internalState))
    }, [key, internalState])

    return [internalState, setInternalState] as const
}

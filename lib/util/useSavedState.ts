import {useState} from "react";

export function useSavedState<T extends object>(key:string, initialState: T, loadStateIfAvailable: boolean = true) {
    let startState = initialState
    if (loadStateIfAvailable) {
        const savedState = localStorage.getItem(key)
        startState = savedState? JSON.parse(savedState): initialState
    }
    const [internalState, setInternalState] = useState<T>(startState)
    storeState()
    const setState = (state: T) => {
        setInternalState(state)
        storeState()
    }

    function storeState() {
        localStorage.setItem(key, JSON.stringify(internalState))
    }

    return [internalState, setState] as const
}

'use client';

import { Dispatch, SetStateAction, useCallback, useState } from 'react'

interface UseToggleReturnType {
    value: boolean;
    toggle: () => void;
    setValue: Dispatch<SetStateAction<boolean>>
}

export function useToggle(defaultValue: boolean = false): UseToggleReturnType {
    const [value, setValue] = useState<boolean>(defaultValue);

    const toggle = useCallback(() => setValue(prev => !prev), []);

    return {
        value,
        toggle,
        setValue
    }
}   
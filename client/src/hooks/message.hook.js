import {useCallback} from 'react'

export const useMessage = () => {
    return useCallback((text, block) => {
        if (text.message && block) {
            block.innerHTML = text.message
        }
    }, [])
}

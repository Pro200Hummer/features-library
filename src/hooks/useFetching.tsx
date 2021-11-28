import {Dispatch, SetStateAction, useState} from "react";

type UseFetchingReturnType = [() => Promise<void>, boolean, string, Dispatch<SetStateAction<string>>]

export const useFetching = (callback: () => Promise<void>): UseFetchingReturnType => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const fetchPosts = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (error: any) { //fix any
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetchPosts, isLoading, error, setError]
}
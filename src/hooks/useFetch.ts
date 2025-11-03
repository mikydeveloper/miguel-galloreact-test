import { useEffect, useState } from "react"

interface Params {
    url: string,
    page: string
}

type Data<T> = T | null;

interface Response<T> {
    data: Data<T>
}

export const useFetch = <T>({ url, page }: Params): Response<T> => {
    const [data, setData] = useState<Data<T>>(null)

    useEffect(() => {
        fetch(`${url}?page=${page}`)
            .then((res) => res.json())
            .then((res) => {
                setData(res)
            })
    }, [url, page])

    return { data }
}



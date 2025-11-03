export interface Character {
    id: number,
    name: string,
    species: string,
    gender: string,
    image: string,
    created: string
}

interface info {
    pages: number
}

export interface ApiResponse {
    info: info,
    results: Character[]
}
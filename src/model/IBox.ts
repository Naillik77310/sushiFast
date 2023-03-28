
export interface IBox {
    id: number
    pieces: number
    nom: string
    image: string
    prix: number
    saveurs: string[]
    aliments: [
        {
            nom: string
            quantite: number
        }
    ]
}
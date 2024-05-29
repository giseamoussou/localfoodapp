export interface Plat {
    id: number
    nom: string
    description: string
    image: string
    prix: number
    qte: number


}

export interface Commande {
    id: number
    date_com: Date
    adresse_liv: string 
    status: string

}

export interface Commercante {
    id: number
    nom: string
    prenom: string
    contact: string
    adresse: string
    ville: string
    quartier: string

}

export interface Spécialite {
    id: number
    nom_spe: string

}

export interface Paiement {
    id: number
    date_paie: Date
    montant: number

}
export interface Commercante {
    id: number
    etat: string
    date_liv: Date


}


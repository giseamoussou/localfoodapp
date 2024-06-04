export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      commande: {
        Row: {
          createdAt: string
          id: number
          livraisonId: number | null
          paiementId: number | null
          reference: string | null
          userId: number | null
          userName: string | null
        }
        Insert: {
          createdAt?: string
          id?: number
          livraisonId?: number | null
          paiementId?: number | null
          reference?: string | null
          userId?: number | null
          userName?: string | null
        }
        Update: {
          createdAt?: string
          id?: number
          livraisonId?: number | null
          paiementId?: number | null
          reference?: string | null
          userId?: number | null
          userName?: string | null
        }
        Relationships: []
      }
      livraison: {
        Row: {
          commandeId: number | null
          id: number
          statut: Database["public"]["Enums"]["StatusLivraison"] | null
        }
        Insert: {
          commandeId?: number | null
          id?: number
          statut?: Database["public"]["Enums"]["StatusLivraison"] | null
        }
        Update: {
          commandeId?: number | null
          id?: number
          statut?: Database["public"]["Enums"]["StatusLivraison"] | null
        }
        Relationships: []
      }
      paiement: {
        Row: {
          date_paie: string
          id: number
          montant: number | null
        }
        Insert: {
          date_paie: string
          id?: number
          montant?: number | null
        }
        Update: {
          date_paie?: string
          id?: number
          montant?: number | null
        }
        Relationships: []
      }
      parametre: {
        Row: {
          created_at: string
          id: number
          privateKey: string | null
          publicKey: string | null
          secretKey: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          privateKey?: string | null
          publicKey?: string | null
          secretKey?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          privateKey?: string | null
          publicKey?: string | null
          secretKey?: string | null
        }
        Relationships: []
      }
      plat: {
        Row: {
          description: string | null
          id: number
          image: string | null
          nom: string | null
          prix: number | null
          restauratriceId: number | null
        }
        Insert: {
          description?: string | null
          id?: number
          image?: string | null
          nom?: string | null
          prix?: number | null
          restauratriceId?: number | null
        }
        Update: {
          description?: string | null
          id?: number
          image?: string | null
          nom?: string | null
          prix?: number | null
          restauratriceId?: number | null
        }
        Relationships: []
      }
      "plat-commande": {
        Row: {
          commandeId: number | null
          createdAt: string
          id: number
          platId: number | null
          platName: string | null
          Qte: number | null
        }
        Insert: {
          commandeId?: number | null
          createdAt?: string
          id?: number
          platId?: number | null
          platName?: string | null
          Qte?: number | null
        }
        Update: {
          commandeId?: number | null
          createdAt?: string
          id?: number
          platId?: number | null
          platName?: string | null
          Qte?: number | null
        }
        Relationships: []
      }
      restauratrice: {
        Row: {
          adresse: string | null
          contact: string | null
          id: number
          nom: string
          prenom: string | null
          quartier: string | null
          specialites: string[] | null
          ville: string | null
        }
        Insert: {
          adresse?: string | null
          contact?: string | null
          id?: number
          nom: string
          prenom?: string | null
          quartier?: string | null
          specialites?: string[] | null
          ville?: string | null
        }
        Update: {
          adresse?: string | null
          contact?: string | null
          id?: number
          nom?: string
          prenom?: string | null
          quartier?: string | null
          specialites?: string[] | null
          ville?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      StatusLivraison: "Attente" | "Livree"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

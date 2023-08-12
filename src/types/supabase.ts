export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Comments: {
        Row: {
          created_at: string
          id: number
          project_id: number
          token_count: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          project_id: number
          token_count?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          project_id?: number
          token_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Comments_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          }
        ]
      }
      Projects: {
        Row: {
          created_at: string | null
          id: number
          rules: Json | null
          title: string | null
          updated_at: string | null
          user: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          rules?: Json | null
          title?: string | null
          updated_at?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          rules?: Json | null
          title?: string | null
          updated_at?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Projects_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Users: {
        Row: {
          created_at: string
          "email ": string | null
          email_verified: string | null
          image_url: string | null
          stripe_current_period_end: string | null
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_uid: string
        }
        Insert: {
          created_at?: string
          "email "?: string | null
          email_verified?: string | null
          image_url?: string | null
          stripe_current_period_end?: string | null
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_uid: string
        }
        Update: {
          created_at?: string
          "email "?: string | null
          email_verified?: string | null
          image_url?: string | null
          stripe_current_period_end?: string | null
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "Users_user_uid_fkey"
            columns: ["user_uid"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

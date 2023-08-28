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
      Logs: {
        Row: {
          created_at: string
          id: number
          project_id: number
          token_count: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          project_id: number
          token_count: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          project_id?: number
          token_count?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Logs_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Logs_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "Users"
            referencedColumns: ["user_uid"]
          }
        ]
      }
      Projects: {
        Row: {
          created_at: string
          id: number
          repository_id: number | null
          rules: string[] | null
          title: string
          updated_at: string | null
          user: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          repository_id?: number | null
          rules?: string[] | null
          title: string
          updated_at?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          repository_id?: number | null
          rules?: string[] | null
          title?: string
          updated_at?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Projects_user_fkey"
            columns: ["user"]
            referencedRelation: "Users"
            referencedColumns: ["userName"]
          }
        ]
      }
      Users: {
        Row: {
          created_at: string
          email: string
          email_verified: string | null
          image_url: string | null
          stripe_current_period_end: string | null
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          tokens: number
          updated_at: string | null
          user_uid: string
          userName: string
        }
        Insert: {
          created_at?: string
          email: string
          email_verified?: string | null
          image_url?: string | null
          stripe_current_period_end?: string | null
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          tokens: number
          updated_at?: string | null
          user_uid: string
          userName: string
        }
        Update: {
          created_at?: string
          email?: string
          email_verified?: string | null
          image_url?: string | null
          stripe_current_period_end?: string | null
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          tokens?: number
          updated_at?: string | null
          user_uid?: string
          userName?: string
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

/*
 * Supabase database types — HAND-WRITTEN ASSUMPTION.
 *
 * No local Supabase project/schema was found in this repo, so these types are
 * based on the storefront's requirements only. They MUST be regenerated against
 * the real schema with `supabase gen types typescript` before connecting to a
 * live project. Every table/column below is a proposed schema, not an existing
 * one — see supabase/schema.sql for the matching DDL proposal and the gaps
 * listed in the final build report.
 */

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          concentration: string | null; // e.g. "Eau de Parfum"
          size_ml: number | null;
          price_cents: number | null;
          bestseller: boolean | null;
          preorder: boolean | null;
          active: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          concentration?: string | null;
          size_ml?: number | null;
          price_cents?: number | null;
          bestseller?: boolean | null;
          preorder?: boolean | null;
          active?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          concentration?: string | null;
          size_ml?: number | null;
          price_cents?: number | null;
          bestseller?: boolean | null;
          preorder?: boolean | null;
          active?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          url: string;
          alt_text: string | null;
          position: number | null;
          is_primary: boolean | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          url: string;
          alt_text?: string | null;
          position?: number | null;
          is_primary?: boolean | null;
        };
        Update: {
          id?: string;
          product_id?: string;
          url?: string;
          alt_text?: string | null;
          position?: number | null;
          is_primary?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          size_label: string | null; // e.g. "30 ml", "10 ml travel", "set"
          size_ml: number | null;
          price_cents: number | null;
          stock_qty: number | null;
          active: boolean | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          size_label?: string | null;
          size_ml?: number | null;
          price_cents?: number | null;
          stock_qty?: number | null;
          active?: boolean | null;
        };
        Update: {
          id?: string;
          product_id?: string;
          size_label?: string | null;
          size_ml?: number | null;
          price_cents?: number | null;
          stock_qty?: number | null;
          active?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
        };
        Relationships: [];
      };
      product_categories: {
        Row: {
          product_id: string;
          category_id: string;
        };
        Insert: {
          product_id: string;
          category_id: string;
        };
        Update: {
          product_id: string;
          category_id: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_categories_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_categories_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      scent_notes: {
        Row: {
          id: string;
          name: string;
          slug: string;
          note_type: "top" | "heart" | "base";
          description: string | null;
          icon_url: string | null;
          active: boolean | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          note_type: "top" | "heart" | "base";
          description?: string | null;
          icon_url?: string | null;
          active?: boolean | null;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          note_type?: "top" | "heart" | "base";
          description?: string | null;
          icon_url?: string | null;
          active?: boolean | null;
        };
        Relationships: [];
      };
      product_notes: {
        Row: {
          product_id: string;
          note_id: string;
          note_type: "top" | "heart" | "base";
        };
        Insert: {
          product_id: string;
          note_id: string;
          note_type: "top" | "heart" | "base";
        };
        Update: {
          product_id?: string;
          note_id?: string;
          note_type?: "top" | "heart" | "base";
        };
        Relationships: [
          {
            foreignKeyName: "product_notes_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_notes_note_id_fkey";
            columns: ["note_id"];
            isOneToOne: false;
            referencedRelation: "scent_notes";
            referencedColumns: ["id"];
          },
        ];
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          user_id: string | null;
          author_name: string | null;
          rating: number | null;
          title: string | null;
          body: string | null;
          active: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          user_id?: string | null;
          author_name?: string | null;
          rating?: number | null;
          title?: string | null;
          body?: string | null;
          active?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          product_id?: string;
          user_id?: string | null;
          author_name?: string | null;
          rating?: number | null;
          title?: string | null;
          body?: string | null;
          active?: boolean | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
      journal_articles: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          body: string | null;
          cover_image: string | null;
          author: string | null;
          published_at: string | null;
          active: boolean | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt?: string | null;
          body?: string | null;
          cover_image?: string | null;
          author?: string | null;
          published_at?: string | null;
          active?: boolean | null;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string | null;
          body?: string | null;
          cover_image?: string | null;
          author?: string | null;
          published_at?: string | null;
          active?: boolean | null;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          status: string | null;
          total_cents: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          email: string;
          status?: string | null;
          total_cents?: number | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          email?: string;
          status?: string | null;
          total_cents?: number | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          variant_id: string | null;
          quantity: number | null;
          price_cents: number | null;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          variant_id?: string | null;
          quantity?: number | null;
          price_cents?: number | null;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          variant_id?: string | null;
          quantity?: number | null;
          price_cents?: number | null;
        };
        Relationships: [];
      };
      carts: {
        Row: {
          id: string;
          user_id: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      cart_items: {
        Row: {
          id: string;
          cart_id: string;
          product_id: string;
          variant_id: string | null;
          quantity: number | null;
        };
        Insert: {
          id?: string;
          cart_id: string;
          product_id: string;
          variant_id?: string | null;
          quantity?: number | null;
        };
        Update: {
          id?: string;
          cart_id?: string;
          product_id?: string;
          variant_id?: string | null;
          quantity?: number | null;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          variant_id: string | null;
          cadence: string | null;
          status: string | null;
          next_charge_at: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          variant_id?: string | null;
          cadence?: string | null;
          status?: string | null;
          next_charge_at?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          cadence?: string | null;
          status?: string | null;
          next_charge_at?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          label: string | null;
          full_name: string | null;
          line1: string | null;
          line2: string | null;
          city: string | null;
          postal_code: string | null;
          country: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          label?: string | null;
          full_name?: string | null;
          line1?: string | null;
          line2?: string | null;
          city?: string | null;
          postal_code?: string | null;
          country?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          label?: string | null;
          full_name?: string | null;
          line1?: string | null;
          line2?: string | null;
          city?: string | null;
          postal_code?: string | null;
          country?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_order: {
        Args: {
          items: { product_id: string; variant_id?: string; quantity: number }[];
          email: string;
        };
        Returns: {
          order_id: string;
          status: string;
          total_cents: number;
        };
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductImage = Database["public"]["Tables"]["product_images"]["Row"];
export type ProductVariant = Database["public"]["Tables"]["product_variants"]["Row"];
export type ScentNote = Database["public"]["Tables"]["scent_notes"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type JournalArticle = Database["public"]["Tables"]["journal_articles"]["Row"];

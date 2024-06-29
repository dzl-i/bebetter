import crypto from "crypto";

export const BASE_URL = 'https://trackapi.nutritionix.com'; // Host domain from the image
export const ENDPOINT = '/v2/natural/nutrients'; // Endpoint from the image

export interface FoodItem {
  food_name: string;
  brand_name: string | null;
  serving_qty: number;
  serving_unit: string;
  serving_weight_grams: number;
  nf_calories: number;
  nf_total_fat: number;
  nf_saturated_fat: number;
  nf_cholesterol: number;
  nf_sodium: number;
  nf_total_carbohydrate: number;
  nf_dietary_fiber: number;
  nf_sugars: number;
  nf_protein: number;
  nf_potassium: number;
  nf_p: number;
  full_nutrients: any[]; // Or define a specific type if known
  nix_brand_name: string | null;
  nix_brand_id: string | null;
  nix_item_name: string | null;
  nix_item_id: string | null;
  upc: string | null;
  consumed_at: string;
  metadata: any; // Or define a specific type if known
  source: number;
  ndb_no: number;
  tags: any; // Or define a specific type if known
  alt_measures: any[]; // Or define a specific type if known
  lat: number | null;
  lng: number | null;
  meal_type: number;
  photo: any; // Or define a specific type if known
  sub_recipe: any | null; // Or define a specific type if known
  class_code: any | null; // Or define a specific type if known
  brick_code: any | null; // Or define a specific type if known
  tag_id: any | null; // Or define a specific type if known
}

export interface NutrientResponse {
  data: FoodItem[]
}

export interface NutrientRequest {
  query: string
}

export function getHash(plaintext: string) {
  return crypto.createHash("sha256").update(plaintext).digest("hex");
}
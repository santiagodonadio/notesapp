import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://glimjdolldpwrpwdvuga.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsaW1qZG9sbGRwd3Jwd2R2dWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNDkxNTQsImV4cCI6MjA2MDkyNTE1NH0.ahgZ3AldEv5sMWwE8s9A975PLpV06D5x5CyAlmnodPo";

export const supabase = createClient(supabaseUrl, supabaseKey);

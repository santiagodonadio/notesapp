// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Fetching the URL and Key from environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
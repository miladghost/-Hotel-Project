import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qeggtxwdzflplpvdkcqe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlZ2d0eHdkemZscGxwdmRrY3FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NDcyMDksImV4cCI6MjA3NDAyMzIwOX0.6bQZ-aghokQBgp_2IuxjLcgTy2gClYLjnGK8HLLR3iI";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

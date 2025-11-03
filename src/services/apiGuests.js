import supabase from "./supabase";

export async function getGuestsApi() {
  const { data, error } = await supabase.from("guests").select("*");
  if (error) throw new Error("couldn't get guests data from supabase");
  return data;
}

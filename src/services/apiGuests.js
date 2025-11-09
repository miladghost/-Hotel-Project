import supabase from "./supabase";

export async function getGuestsApi() {
  const { data, error } = await supabase.from("guests").select("*");
  if (error) throw new Error("couldn't get guests data from supabase");
  return data;
}
export async function deleteGuestApi(id) {
  const { data, error } = await supabase.from("guests").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return data;
}
export async function createNewGuestApi(newGuest) {
  const { data, error } = await supabase
    .from("guests")
    .insert([newGuest])
    .select();
  if (error) throw new Error(error.message);
  return data;
}

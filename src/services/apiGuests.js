import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getGuestsApi({ currentPage, search, rawSortObj }) {
  let query;
  query = supabase.from("guests").select("*", { count: "exact" });
  if (search) {
    query = query.or(
      `fullName.ilike.%${search}%,email.ilike.%${search}%,nationality.ilike.%${search}%,nationalID.ilike.%${search}%`
    );
  }
  if (rawSortObj) {
    query = query.order(rawSortObj.field, {
      ascending: rawSortObj.direction === "asc",
    });
  }
  if (currentPage) {
    const from = (currentPage - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) throw new Error("couldn't get guests data from supabase");
  return { data, count };
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
export async function updateGusetApi({ newGuest, id }) {
  const { data, error } = await supabase
    .from("guests")
    .update({ ...newGuest })
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
}
export async function getAllGuestsApi() {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

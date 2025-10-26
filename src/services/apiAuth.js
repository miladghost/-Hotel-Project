import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function signupApi({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });
  if (error) throw new Error("couldnt signup user");
  return { data };
}
export async function loginApi({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return { data, error };
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error("couldn't get User Data");
  return data?.user;
}
export async function logOutApi() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
export async function updateCurrentUser({ fullName, avatar, password }) {
  console.log(avatar);
  //update fullName or password
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;
  //upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) throw new Error(uploadError.message);
  //update avatar
  const avatarPath = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
  const { data: updatedAvatar, error: error2 } = await supabase.auth.updateUser(
    {
      data: { avatar: avatarPath },
    }
  );
  if (error2) throw new Error(error2.message);
  return updatedAvatar;
}

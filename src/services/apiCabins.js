import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("couldnt get any cabins");
  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("couldnt delete any cabins");
  return data;
}

//Seperate for Edit And Create Cabin
export async function createNewCabin(newCabin) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin_imgs/${imageName}`;
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) throw new Error("creatig new cabin failed");
  if (!hasImagePath) {
    const { error: uploadError } = await supabase.storage
      .from("cabin_imgs")
      .upload(imageName, newCabin.image);
    if (uploadError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error("there was a problem in uploading");
    }
  }

  return data;
}
export async function editNewCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin_imgs/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imagePath })
    .eq("id", id)
    .select();

  if (error) throw new Error("updating cabin failed");
  if (!hasImagePath) {
    const { error: uploadError } = await supabase.storage
      .from("cabin_imgs")
      .upload(imageName, newCabin.image);
    if (uploadError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error("there was a problem in uploading");
    }
  }
  return data;
}
// //Combined Version
// export default async function createEditCabin(newCabin, id) {
//   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath = hasImagePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin_imgs/${imageName}`;

//   let query = supabase.from("cabins");

//   if (!id)
//     query = query.insert([
//       {
//         ...newCabin,
//         image: imagePath,
//         price: Number(newCabin.price),
//         discount: Number(newCabin.discount),
//         maxCapacity: Number(newCabin.maxCapacity),
//       },
//     ]);

//   if (id)
//     query = query
//       .update({
//         ...newCabin,
//         image: imagePath,
//         price: Number(newCabin.price),
//         discount: Number(newCabin.discount),
//         maxCapacity: Number(newCabin.maxCapacity),
//       })
//       .eq("id", id);

//   const { data, error } = await query.select().single();
//   if (error) throw new Error("updating cabin failed");
//   if (!hasImagePath) {
//     const { error: uploadError } = await supabase.storage
//       .from("cabin_imgs")
//       .upload(imageName, newCabin.image);
//     if (uploadError) {
//       await supabase.from("cabins").delete().eq("id", data.id);
//       throw new Error("there was a problem in uploading");
//     }
//   }
//   return data;
// }

// export async function createEditCabin(newCabin, id) {
//   //https://qeggtxwdzflplpvdkcqe.supabase.co/sto rage/v1/object/public/cabin_imgs/cabin-001.jpg
//   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath = hasImagePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin_imgs/${imageName}`;
//   let query = supabase.from("cabins");
//   //Create new cabin
//   if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

//   //Edit cabin
//   if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

//   const { data, error } = await query.select().single();
//   if (error) throw new Error("couldnt create any cabins");

//   //upload

//   const { error: uploadError } = await supabase.storage
//     .from("cabin_imgs")
//     .upload(imageName, newCabin.image);
//   if (uploadError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     throw new Error("there was a problem in uploading");
//   }
//   return data;
// }

// import supabase, { supabaseUrl } from "./supabase";

// export async function getCabins() {
//   const { data, error } = await supabase.from("cabins").select("*");

//   if (error) {
//     console.error(error);
//     throw new Error("Cabins could not be loaded");
//   }

//   return data;
// }

// export async function createEditCabin(newCabin, id) {
//   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath = hasImagePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   // 1. Create/edit cabin
//   let query = supabase.from("cabins");

//   // A) CREATE
//   if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

//   // B) EDIT
//   if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

//   const { data, error } = await query.select().single();

//   if (error) {
//     console.error(error);
//     throw new Error("Cabin could not be created");
//   }

//   // 2. Upload image
//   if (hasImagePath) return data;

//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabin.image);

//   // 3. Delete the cabin IF there was an error uplaoding image
//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.error(storageError);
//     throw new Error(
//       "Cabin image could not be uploaded and the cabin was not created"
//     );
//   }

//   return data;
// }

// export async function deleteCabin(id) {
//   const { data, error } = await supabase.from("cabins").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Cabin could not be deleted");
//   }

//   return data;
// }

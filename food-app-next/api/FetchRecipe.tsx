type Recipe = {
  body: string;
  field_ingredients: string;
  field_instructions: string;
  field_recipe_name: string;
  field_recipe_image?: {
    url: string;
    alt: string;
  };
  uuid: string;
};

export async function fetchRecipe(): Promise<Recipe[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/recipe`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data = await response.json();
  console.log(data)

  if (!Array.isArray(data)) {
    throw new Error("Unexpected API response structure: Expected an array");
  }

  // Map and extract fields
  return data.map((item) => ({
    body: item.body?.[0]?.value || "", // Assuming `body` is an array and taking the first item
    field_ingredients: item.field_ingredients?.[0]?.value || "", // Extract the first value
    field_instructions: item.field_instructions?.[0]?.value || "",
    field_recipe_name: item.field_recipe_name?.[0]?.value || "",
    uuid: item.uuid?.[0]?.value || "",
    field_recipe_image: item.field_recipe_image?.[0]
      ? {
          url: item.field_recipe_image[0]?.url || "", // Adjust if the URL is nested further
          alt: item.field_recipe_image[0]?.alt || "",
        }
      : undefined,
  }));
}

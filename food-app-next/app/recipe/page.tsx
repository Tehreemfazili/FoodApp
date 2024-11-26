// "use client";

import { NodeRecipeTeaser } from "@/components/node--recipe--teaser";
import { drupal } from "@/lib/drupal";
import { DrupalNode } from "next-drupal";

// import { fetchRecipe } from "@/api/FetchRecipe";
// import { useEffect, useState } from "react";
// import styles from '@/styles/recipe.module.css'
// import Image from "next/image";
// import Link from "next/link";

// type Recipe = {
//   body: string;
//   field_ingredients: string;
//   field_instructions: string;
//   field_recipe_name: string;
//   field_recipe_image?: {
//     url: string;
//     alt: string;
//   };
//   uuid: string;
// };

// function stripHtmlTags(input: string): string {
//   return input.replace(/<\/?[^>]+(>|$|&nbsp)/g, "").replace(/&nbsp;/g, ' '); // Removes all HTML tags
// }


// export default function Recipe() {
//   const [Recipes, setRecipes] = useState<Recipe[] | null>(null);

//   useEffect(() => {
//     const loadRecipes = async () => {
//       try {
//         const items = await fetchRecipe();
//         setRecipes(items);
//       } catch (error) {
//         console.error("Failed to fetch recipes:", error);
//       }
//     };

//     loadRecipes();

//   }, []);

//   return (
//     <div className={styles.recipe_wrapper}>
//       {Recipes?.map((item, index) => (
//         <div key={index} className={styles.recipe_item}>
//           <h1 className={styles.recipe_name}>{stripHtmlTags(item.field_recipe_name)}</h1>
//           {item.field_recipe_image?.url ? (
//             <Image
//               src={item.field_recipe_image.url}
//               width={240}
//               height={240}
//               alt={item.field_recipe_image.alt || "Recipe Image"}
//             />
//           ) : (
//             <p>No image available</p>
//           )}
//           <p className="text-white">{stripHtmlTags(item.body)}</p>
//           <Link href='/' className={styles.read_more_btn}>Read More</Link>
//           {/* <p className="text-white">{stripHtmlTags(item.field_ingredients)}</p>
//           <p className="text-white">{stripHtmlTags(item.field_instructions)}</p> */}
//         </div>
//       ))}
//     </div>
//   );
// }


export default async function recipe() {
  const nodes = await drupal.getResourceCollection<DrupalNode[]>("node--recipe");
  return (
    <div>
      {nodes?.length ? (
        nodes.map((node) => (
          <div key={node.id}>
            <NodeRecipeTeaser node={node} />
          </div>
        ))
      ) : (
        <p className="py-4">No nodes found</p>
      )}
    </div>
  );
}

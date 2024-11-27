import { drupal } from "@/lib/drupal";
import { DrupalNode } from "next-drupal";
import styles from "../styles/community.module.css";
import Link from "next/link";
import { absoluteUrlCustom } from "@/lib/utils";
import Image from "next/image";
import ImageSlideshow from "./image-slideshow";

// Define the type for an individual image
interface SlideshowImage {
  image: string; // URL of the image
  alt: string; // Alt text for the image
}

// export default async function ParentComponent() {
//   // Assume `communityNode[0].field_browsing_images` contains an array of image references

//   return <ImageSlideshow images={images} />;
// }

export default async function Community() {
  const communityNode = await drupal.getResourceCollection<DrupalNode[]>(
    "node--browser_section",
    {
      params: {
        "filter[status]": 1,
        "fields[node--browser_section]":
          "title,path,body,field_browse_meals,field_browse_recipe,field_browsing_images,uid,created",
        include: "uid",
        sort: "-created",
      },
    }
  );

  // Fetch additional image details for each image reference
  const images: SlideshowImage[] = await Promise.all(
    communityNode[0].field_browsing_images.map(
      async (image: { id: string }) => {
        const file = await drupal.getResource("file--file", image.id);
        return {
          image: file.uri.url, // Use the correct field for the image URL
          alt: "Default alt text", // Fallback if no alt text is provided
        };
      }
    )
  );
  console.log(communityNode[0].field_browsing_images.length);
  return (
    <>
      {communityNode.map((node, index) => {
        return (
          <div key={index} className={styles.community}>
            {communityNode[0].field_browsing_images.length > 1 ? (
              <ImageSlideshow images={images} />
            ) : (
              <Image
                src={communityNode[0].field_browsing_images.uri}
                width={240}
                height={240}
                alt=""
              ></Image>
            )}
            <div className={styles.community_content}>
              <h1 className={styles.community_title}>{communityNode[0].title}</h1>
              <h3 className={styles.community_description}>{communityNode[0].body.value}</h3>
              <Link
                href={absoluteUrlCustom(
                  communityNode[0].field_browse_recipe.uri
                )}
                className={styles.community_join_link}
              >
                {communityNode[0].field_browse_recipe.title}
              </Link>
              <Link
                href={absoluteUrlCustom(
                  communityNode[0].field_browse_meals.uri
                )}
                className={styles.community_meal_link}
              >
                {communityNode[0].field_browse_meals.title}
              </Link>
             
            </div>
          </div>
        );
      })}
    </>
  );
}

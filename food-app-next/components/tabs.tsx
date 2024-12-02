import { drupal } from "@/lib/drupal";
import { DrupalParagraph } from "next-drupal";
import { absoluteUrlCustom } from "@/lib/utils";
import TabClientComponent from "./tab";

export default async function Tabs() {
  const tabs = await drupal.getResourceCollection<DrupalParagraph[]>(
    "paragraph--tabs"
  );

  const tabWithImages = await Promise.all(
    tabs.map(async (item) => {
      let imageUrl = null;

      // Fetch the image if the field exists
      if (item.field_tab_content_image?.id) {
        try {
          const file = await drupal.getResource("file--file", item.field_tab_content_image.id);
          imageUrl = file?.uri?.url ? absoluteUrlCustom(file.uri.url) : null;
        } catch (error) {
          console.error(`Error fetching image for tab ${item.id}:`, error);
        }
      }

      return {
        ...item,
        imageUrl, // Add the fetched image URL to the item
      };
    })
  );

  return <TabClientComponent tab={tabWithImages} />;
}

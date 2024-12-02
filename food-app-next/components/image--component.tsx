import { drupal } from "@/lib/drupal";
import { absoluteUrlCustom } from "@/lib/utils";

export async function fetchImageUrl(imageId: string): Promise<string | null> {
  try {
    const file = await drupal.getResource("file--file", imageId);
    if (file?.uri?.url) {
      return absoluteUrlCustom(file.uri.url);
    }
    return null;
  } catch (error) {
    console.error(`Error fetching image with id ${imageId}:`, error);
    return null;
  }
}

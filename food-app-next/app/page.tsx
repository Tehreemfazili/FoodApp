import Image from "next/image";
import styles from "./page.module.css";
import { DrupalNode } from "next-drupal";
import { drupal } from "@/lib/drupal";
import { absoluteUrlCustom } from "@/lib/utils";
// import PartnersList from "@/components/partners--list";

export default async function Home() {
  const nodes = await drupal.getResourceCollection<DrupalNode>(
    "node--landing_page"
  );
  console.log(nodes)

  return (
    <div>
      <main className={styles.page}>
        <div className={styles.image}>
          <Image
            src={absoluteUrlCustom(nodes[0].field_hero_image.uri.url)}
            width={768}
            height={480}
            alt=""
          />
        </div>
        {/* <PartnersList/> */}
      </main>
    </div>
  );
}

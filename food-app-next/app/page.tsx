import Image from "next/image";
import styles from "./page.module.css";
import { DrupalNode } from "next-drupal";
import { drupal } from "@/lib/drupal";
import { absoluteUrlCustom } from "@/lib/utils";
import PartnersList from "@/components/partners--list";
import Community from "@/components/node--community";
import Tabs from "@/components/tabs";

export default async function Home() {
  const nodes = await drupal.getResourceCollection<DrupalNode>(
    "node--landing_page",
    {
      params: {
        "filter[status]": 1,
        "fields[node--article]": "title,path,field_hero_image,uid,created",
        include: "field_hero_image,uid",
        sort: "-created",
      },
    }
  );

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
        <div className={styles.page_content}>
          <Tabs/>
          <Community/>
          <PartnersList />
        </div>
      </main>
    </div>
  );
}

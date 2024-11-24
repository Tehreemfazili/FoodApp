import { drupal } from "@/lib/drupal";
import { DrupalParagraph } from "next-drupal";
import { Partner } from "./partner";
import styles from "../styles/partners.module.css";

export default async function PartnersList() {
  const partner = await drupal.getResourceCollection<DrupalParagraph[]>("paragraph--partners");
  return (
    <div className={styles.partner}>
      {partner?.length ? (
        partner.map((list) => (
          <div key={list.id}>
            <Partner partner={list} />
          </div>
        ))
      ) : (
        <p className="py-4">No partner found</p>
      )}
    </div>
  );
}

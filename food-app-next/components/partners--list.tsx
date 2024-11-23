import { drupal } from "@/lib/drupal";
import { DrupalParagraph } from "next-drupal";
import { Partner } from "./partner";

export default async function PartnersList() {
  const partner = await drupal.getResourceCollection<DrupalParagraph[]>("paragraph--partners");
// console.log(partner)
  return (
    <>
      {partner?.length ? (
        partner.map((list) => (
          <div key={list.id}>
            {/* <Image src={list.} */}
            <Partner partner={list} />
          </div>
        ))
      ) : (
        <p className="py-4">No partner found</p>
      )}
    </>
  );
}

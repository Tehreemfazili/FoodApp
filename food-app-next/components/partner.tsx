// import { absoluteUrlCustom } from "@/lib/utils";
import { drupal } from "@/lib/drupal";
import { absoluteUrlCustom } from "@/lib/utils";
import { DrupalParagraph } from "next-drupal";
import Image from "next/image";

interface PartnerProps {
  partner: DrupalParagraph;
}

export async function Partner({ partner, ...props }: PartnerProps) {
  const file = await drupal.getResource("file--file", partner.field_partner_logo.id);
  return (
    <div {...props}>
      <a href={partner.field_partner_link.uri}>
        <Image src={absoluteUrlCustom(file.uri.url)} width={340} height={340} alt="" />
      </a>
    </div>
  );
}

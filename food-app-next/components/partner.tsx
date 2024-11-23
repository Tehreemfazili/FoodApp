import { absoluteUrlCustom } from "@/lib/utils";
import { DrupalParagraph } from "next-drupal";
import Image from "next/image";

interface PartnerProps {
  partner: DrupalParagraph;
}

export function Partner({ partner, ...props }: PartnerProps) {
  console.log(partner.field_partner_logo);
  return (
    <div {...props}>
      <a href={partner.field_partner_link.uri}>
        <Image src={absoluteUrlCustom(partner.field_partner_logo.id) }width={24} height={24} alt="" />
      </a>
    </div>
  );
}

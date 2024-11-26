// import Image from "next/image"
import Link from "next/link"
import { DrupalNode } from "next-drupal"
// import Image from "next/image"
// import { absoluteUrlCustom } from "@/lib/utils"


interface NodeRecipeTeaserProps {
  node: DrupalNode
}

export function NodeRecipeTeaser({ node, ...props }: NodeRecipeTeaserProps) {
  console.log(node.path.alias)
  return (
    <article {...props}>
      <Link href={node.path.alias} className="no-underline hover:text-blue-600">
        <h2 className="mb-4 text-4xl font-bold">{node.field_recipe_name}</h2>
      </Link>
      {node.field_recipe_image && (
        <figure className="my-4">
          {/* <Image
            src={absoluteUrlCustom(node.field_recipe_image.uri.url)}
            width={768}
            height={480}
            alt={node.field_recipe_image.resourceIdObjMeta.alt}
          /> */}
        </figure>
      )}
      <Link
        href={node.path.alias}
        className="inline-flex items-center px-6 py-2 border border-gray-600 rounded-full hover:bg-gray-100"
      >
        Read article
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 ml-2"
          width={24}
          height={12}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  )
}

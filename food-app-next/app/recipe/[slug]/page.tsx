import { NodeArticle } from "@/components/node--article"
import { drupal } from "@/lib/drupal"
import type { Metadata } from "next"
import { DrupalNode, JsonApiParams } from "next-drupal"
import { notFound } from "next/navigation"

async function getNode(slug: string[]) {

  const path = `/${slug.join("/")}`

  const params: JsonApiParams = {}
  const translatedPath = await drupal.translatePath(path)

  if (!translatedPath) {
    throw new Error("Resource not found", { cause: "NotFound" })
  }

  const type = translatedPath?.jsonapi?.resourceName
  const uuid = translatedPath.entity.uuid

  if (type === "node--recipe") {
    params.include = "field_recipe_image,uid"
  }

  const resource = await drupal.getResource<DrupalNode>(type!, uuid, {
    params,
  })

  console.log(resource, "resourse")

  if (!resource) {
    throw new Error(
      `Failed to fetch resource: ${translatedPath?.jsonapi?.individual}`,
      {
        cause: "DrupalError",
      }
    )
  }

  return resource
}

type NodePageParams = {
  slug: string[]
}
type NodePageProps = {
  params: NodePageParams
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params: { slug } }: NodePageProps,
  // parent: ResolvingMetadata
): Promise<Metadata> {
  let node
  try {
    node = await getNode(slug)
  } catch (e) {
    // If we fail to fetch the node, don't return any metadata.
    console.log(e)
    return {}
  }

  return {
    title: node.title,
  }
}

const RESOURCE_TYPES = ["node--recipe", "node--article"]

export async function generateStaticParams(): Promise<NodePageParams[]> {
  const resources = await drupal.getResourceCollectionPathSegments(
    RESOURCE_TYPES
  )

  return resources.map((resource) => {
    return {
      slug: resource.segments,
    }
  })
}

export default async function NodePage({
  params,
  // searchParams,
}: NodePageProps) {
  // const isDraftMode = draftMode().isEnabled
  const { slug } = params;
  let node
  try {
    node = await getNode(slug)
  } catch (error) {
    // If getNode throws an error, tell Next.js the path is 404.
    console.log(error)
    notFound()
  }

  // If we're not in draft mode and the resource is not published, return a 404.
  // if (!isDraftMode && node?.status === false) {
  //   notFound()
  // }

  return (
    <>
      {/* {node.type === "node--page" && <BasicPage node={node} />} */}
      {node.type === "node--recipe" && <NodeArticle node={node} />}
    </>
  )
}
// import { NodeArticleTeaser } from "@/components/node--article--teaser";
// import { drupal } from "@/lib/drupal";
// import { DrupalNode } from "next-drupal";

// interface blogsProps {
//   nodes: DrupalNode[];
// }

// This component is now an async function, which is allowed in the Next.js app router. 
// This function directly fetches data and renders it.


export default async function blogs() {
  // const nodes = await drupal.getResourceCollection<DrupalNode[]>("node--article");
  // return (
  //   <div>
  //     {nodes?.length ? (
  //       nodes.map((node) => (
  //         <div key={node.id}>
  //           <NodeArticleTeaser node={node} />
  //           <hr className="my-20" />
  //         </div>
  //       ))
  //     ) : (
  //       <p className="py-4">No nodes found</p>
  //     )}
  //   </div>
  // );
}

// now getStaticProp is not supported in app, we use direct async in app nextjs.

// export async function getStaticProps(
//   context: GetStaticPropsContext
// ): Promise<GetStaticPropsResult<blogsProps>> {
//   const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
//     "node--article",
//     context,
//     {
//       params: {
//         "filter[status]": 1,
//         "fields[node--article]": "title,path,field_image,uid,created",
//         include: "field_image,uid",
//         sort: "-created",
//       },
//     }
//   )

//   return {
//     props: {
//       nodes,
//     },
//   }
// }

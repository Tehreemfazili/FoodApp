interface MenuItem {
  title: string;
  url: string;
}

interface ApiResponse {
  data: {
    attributes: {
      title: string;
      link: {
        uri: string;
      };
    };
  }[];
}

export async function fetchMenuItems(): Promise<MenuItem[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/menu_link_content/menu_link_content`);

  if (!response.ok) {
    throw new Error("Failed to fetch menu items");
  }

  const data: ApiResponse = await response.json();

  // Optional: log each item to the console
  // data.data.forEach(item => console.log(item));

  return data.data.map(item => ({
    title: item.attributes.title,
    url: item.attributes.link.uri.replace('internal:', '')
  }));
}

import fetch from "node-fetch";

const root = "https://api.figma.com/v1";

interface ComponentMetadata {
  readonly key: string;
  readonly name: string;
  readonly description: string;
}

interface Components {
  [key: string]: ComponentMetadata;
}

const fetcher = (token: string, path: string) => {
  return fetch(`${root}${path}`, {
    headers: {
      "X-Figma-Token": token,
    },
  });
};

export const getFigmaComponents = async (
  token: string,
  id: string
): Promise<Components> => {
  const response = await fetcher(token, `/files/${id}`);
  const { components } = (await response.json()) as {
    components: Components;
  };
  return components;
};

export const getFigmaImages = async (
  token: string,
  id: string,
  components: Components
) => {
  const idMap = Object.keys(components);
  const ids = idMap.join();
  const response = await fetcher(token, `/images/${id}?ids=${ids}&format=svg`);
  const data = (await response.json()) as {
    images: {
      [key: string]: string;
    };
  };
  const images = idMap.map((id) => {
    const { name } = components[id];
    const link = data.images[id];
    return { name, link };
  });
  return images;
};

export const getImageData = async (src: string) => {
  const res = await fetch(src, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
  const data = await res.text();
  return data;
};

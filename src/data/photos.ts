import type { ImageMetadata } from 'astro';

// Every photo in src/assets/photos, looked up by file name without extension.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,jpeg,png,webp}', { eager: true });

const byName = new Map(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.replace(/\.\w+$/, ''), mod.default]),
);

export const photo = (name: string): ImageMetadata => {
  const img = byName.get(name);
  if (!img) throw new Error(`Missing photo: ${name}`);
  return img;
};

/** A product's photos: the main one, then any extras named <name>-2, <name>-3 ... (client photos, when they arrive). */
export const photosFor = (name: string): ImageMetadata[] => {
  const extras = [...byName.keys()]
    .filter((k) => new RegExp(`^${name}-\\d+$`).test(k))
    .sort((a, b) => +a.split('-').pop()! - +b.split('-').pop()!);
  return [photo(name), ...extras.map((k) => byName.get(k)!)];
};

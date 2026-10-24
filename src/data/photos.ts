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

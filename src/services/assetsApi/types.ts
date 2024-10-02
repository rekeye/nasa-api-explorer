import { z } from "zod";

const AssetSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  media_type: z.enum(["image", "video", "audio"]),
  nasa_id: z.string(),
});

const LinkSchema = z.object({
  href: z.string().url(),
});

const CollectionItemSchema = z.object({
  data: z.array(AssetSchema),
  links: z.array(LinkSchema).optional(),
});

const CollectionSchema = z.object({
  items: z.array(CollectionItemSchema),
});

export const ApiResponseSchema = z.object({
  collection: CollectionSchema,
});

// TypeScript types derived from Zod schemas
export type Asset = z.infer<typeof AssetSchema>;
export type Link = z.infer<typeof LinkSchema>;
export type CollectionItem = z.infer<typeof CollectionItemSchema>;
export type Collection = z.infer<typeof CollectionItemSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;

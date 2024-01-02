import { type SanityAsset } from "@sanity/image-url/lib/types/types";
import { type PortableTextBlock } from "sanity";

export type Post = {
  _id: string;
  _createdAt: Date;
  _updatedAt: Date;
  name: string;
  slug: string;
  tags: string[];
  relatedPosts: string[] | null;
  readingTime: number | null;
  thumbnail: {
    alt: string;
    asset: SanityAsset
  };
  content: PortableTextBlock[];
  author: string;
  description: string;
}

export type Author = {
  _id: string;
  slug: string;
  bio: string;
  name: string;
  bioImage: {
    alt: string;
    asset: SanityAsset
  };
}

export type Tag = {
  _id: string;
  slug: string;
  name: string;
}
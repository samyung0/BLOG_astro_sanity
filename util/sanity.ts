import type {Author, Post, Tag} from '../types/sanity'
// import groq from 'groq'
import {SANITY_PROD_URL} from '../const'

export const posts = (await fetch(
  SANITY_PROD_URL +
    `*[_type == "post"] | order(publishedAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    name,
    "slug": slug.current,
    thumbnail {
      alt,
      asset->,
    },
    content[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      },
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "slug": @.reference->slug.current,
          "type": @.reference->_type
        }
      }
    },
    "tags": tags[]->slug.current,
    "author": author->slug.current,
    "relatedPosts": relatedPosts[]->slug.current,
    readingTime,
    description
  }`
).then((data) => data.json())).result as Post[]

export const authors = (await fetch(
  SANITY_PROD_URL +
    `
      *[_type == "author"] {
        _id,
        name,
        "slug": slug.current,
        bio,
        bioImage {
          alt,
          asset->
        }
      }
    `
).then((data) => data.json())).result as Author[]

export const tags = (await fetch(
  SANITY_PROD_URL +
    `
      *[_type == "tag"] {
        _id,
        name,
        "slug": slug.current
      }
    `
).then((data) => data.json())).result as Tag[]

import createImageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

const imageBuilder = createImageUrlBuilder({
  projectId: 'ywfq98mg',
  dataset: 'production',
})

export default (url: string, width?: number) => {
  if (!width) return url
  const sanityImg = imageBuilder?.image(url).width(width).fit('max').auto('format')
  return sanityImg?.url() || ''
}

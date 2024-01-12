import {PortableText, defaultComponents} from '@portabletext/react'
import ReactPlayer from './ReactPlayer'
import type {Post} from '../../types/sanity'

// import style from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark'
// import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import * as shiki from 'shiki'
const highlighter = await shiki.getHighlighter({
  theme: 'github-dark',
})

// import { bundledLanguages, bundledThemes, getHighlighter } from 'shikiji'

// const highlighter = await getHighlighter({
//   themes: Object.keys(bundledThemes),
//   langs: Object.keys(bundledLanguages),
// })

export default ({post}: {post: Post}) => (
  <PortableText
    value={post.content}
    components={{
      block: (props) => {
        const HeadingTag = props.value.style! as any

        if (/^h\d/.test(HeadingTag)) {
          return <HeadingTag id={props.value.children[0].text}>{props.children}</HeadingTag>
        }
        return (defaultComponents.block as any)[HeadingTag](props)
      },
      types: {
        image: (props) => {
          return (
            <figure className="flex justify-center flex-col items-center">
              <a aria-label="Open Image" target="_blank" href={props.value.asset.url}>
                <img
                  style={{
                    backgroundImage: `url(${props.value.asset.metadata.lqip})`,
                    backgroundSize: '50%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                  decoding="async"
                  loading="lazy"
                  className="max-h-[400px] object-contain"
                  src={props.value.asset.url}
                  alt=""
                  width={props.value.asset.metadata.dimensions.width}
                  height={props.value.asset.metadata.dimensions.height}
                />
              </a>
              {props.value.caption && <figcaption>{props.value.caption}</figcaption>}
            </figure>
          )
        },
        code: (props) => {
          const tokens = highlighter.codeToThemedTokens(
            props.value.code,
            props.value.language ?? 'javascript'
          )
          const html = shiki.renderToHtml(tokens, {
            fg: highlighter.getForegroundColor('github-dark'), // Set a specific foreground color.
            bg: highlighter.getBackgroundColor('github-dark'),
            elements: {
              pre({className, style, children}) {
                return `<pre class="${className} ${props.value.filename ? 'filename' : ''} ${
                  props.value.language === 'text' ? 'textBlock' : ''
                }" style="${style}" tabindex="0">${children}</pre>`
              },
              line({className, children, index}) {
                return `<span class="${className} ${
                  (props.value.highlightedLines ?? []).includes(index + 1) ? 'highlight' : ''
                }">${children}</span>`
              },
            },
          })
          return props.value.filename ? (
            <>
              <div className="bg-code-editor text-background-gray inline-block px-5 py-1 text-sm">
                {props.value.filename}
              </div>
              <div className="wrapper" dangerouslySetInnerHTML={{__html: html}}></div>
            </>
          ) : (
            <div className="wrapper" dangerouslySetInnerHTML={{__html: html}}></div>
          )
        },
        embed: (props) => {
          const url = props.value.url
          return <ReactPlayer url={url} />
        },
        sizeChart: (props) => {
          return (
            <table>
              {props.value.rows.map((row: any, index: number) => (
                <tr key={row._key}>
                  {row.cells.map((cell: any) =>
                    index === 0 ? (
                      <th key={row._key + index}>{cell}</th>
                    ) : (
                      <td key={row._key + index}>{cell}</td>
                    )
                  )}
                </tr>
              ))}
            </table>
          )
        },
      },
      marks: {
        indent: (props) => {
          return (
            <span
              style={{
                paddingInlineStart: props.value.indentLevel * 32 + 'px',
                display: 'block',
              }}
            >
              {props.children}
            </span>
          )
        },
        indent2: (props) => {
          return (
            <span
              style={{
                paddingInlineStart: props.value.indentLevel * 32 + 'px',
              }}
            >
              {props.children}
            </span>
          )
        },
        highlight: (props) => {
          return <span style={{backgroundColor: 'tomato'}}>{props.children}</span>
        },
        code: (props) => {
          return <code className="inlineCode">{props.children}</code>
        },
        internalLink: (props) => {
          if (props.value.type === 'author' && props.value.slug === 'sam-yung')
            return <a href="/about">{props.children}</a>
          return <a href={`/${props.value.type}/${props.value.slug}`}>{props.children}</a>
        },
        link: (props) => {
          const {blank, href} = props.value
          return blank ? (
            <a href={href} target="_blank" rel="noopener">
              {props.children}
            </a>
          ) : (
            <a href={href}>{props.children}</a>
          )
        },
      },
    }}
  />
)

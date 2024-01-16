import {PortableText, defaultComponents} from '@portabletext/react'
import ReactPlayer from './ReactPlayer'
import type {Post} from '../../types/sanity'

// import style from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark'
// import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import * as shiki from 'shiki'
const highlighter = await shiki.getHighlighter({
  theme: 'github-dark',
})

export default ({post}: {post: Post}) => (
  <PortableText
    value={post.content}
    components={{
      list: {
        indent: (props) => {
          return (
            <ul className="list-none">
              {props.children}
            </ul>
          )
        }
      },
      block: (props) => {
        const HeadingTag = props.value.style! as any

        if (/^h\d/.test(HeadingTag)) {
          return <HeadingTag id={props.value.children[0].text}>{props.children}</HeadingTag>
        }
        return (defaultComponents.block as any)[HeadingTag](props)
      },
      types: {
        inlineImage: (props) => {
          return (
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
                className="max-h-[200px] max-w-[200px] object-contain float-left m-4 block"
                src={props.value.asset.url}
                alt=""
                width={props.value.asset.metadata.dimensions.width}
                height={props.value.asset.metadata.dimensions.height}
              />
            </a>
          )
        },
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
              <div data-code={props.value.code} className="wrapper relative">
                <div dangerouslySetInnerHTML={{__html: html}}></div>
                <button className="copyCode absolute md:top-4 md:right-4 top-2 right-2">
                  <img
                    src="/copy-outline.svg"
                    alt="Copy"
                    className="block lg:h-[30px] lg:w-[30px] h-[20px] w-[20px] object-contain invert m-0"
                  />
                </button>
              </div>
            </>
          ) : (
            <div data-code={props.value.code} className="wrapper relative">
              <div dangerouslySetInnerHTML={{__html: html}}></div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(props.value.code)
                }}
                className="copyCode absolute md:top-4 md:right-4 top-2 right-2"
              >
                <img
                  src="/copy-outline.svg"
                  alt="Copy"
                  className="block lg:h-[30px] lg:w-[30px] h-[20px] w-[20px] object-contain invert m-0"
                />
              </button>
            </div>
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
          return <span style={{backgroundColor: 'tomato', color: "whitesmoke"}}>{props.children}</span>
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

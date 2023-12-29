import {useState, useEffect} from 'react'
import {useDocumentOperation, useDocumentValues} from 'sanity'

const rec = (content: number, children: any) => {
  for (const i of children) {
    content += i.text?.split(" ").length || 0
    if (i.children) content += rec(0, i.children)
  }
  return content
}

export function SetAndPublishAction(props: any) {
  const data = props.draft || props.published
  const {patch, publish} = useDocumentOperation(props.id, props.type)
  const [isPublishing, setIsPublishing] = useState(false)

  useEffect(() => {
    // if the isPublishing state was set to true and the draft has changed
    // to become `null` the document has been published
    if (isPublishing && !props.draft) {
      setIsPublishing(false)
    }
  }, [props.draft])

  return {
    disabled: publish.disabled,
    label: isPublishing ? 'Publishing…' : 'Publish & Update',
    onHandle: () => {
      // This will update the button text
      setIsPublishing(true)

      patch.execute([{}])

      // Set publishedAt to current date and time
      if (!data.readingTime)
        patch.execute([
          {set: {readingTime: Math.max(Math.round(rec(0, data.content) / 180), 1)}},
        ])

      // Perform the publish
      publish.execute()

      // Signal that the action is completed
      props.onComplete()
    },
  }
}

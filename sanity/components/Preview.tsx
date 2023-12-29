import type { PreviewProps } from "sanity";
import { Flex, Text } from "@sanity/ui";
import ReactPlayer from "react-player";

interface PreviewYouTubeProps extends PreviewProps {
  selection?: {
    url: string;
  };
}

export function Preview(props: PreviewYouTubeProps) {
  const url = (props.title as string | undefined)?.slice(5);
  return (
    <Flex padding={4} justify={"center"}>
      {url ? <ReactPlayer url={url} controls/> : <Text>Add a YouTube URL</Text>}
    </Flex>
  );
}

import ReactPlayer from "react-player/lazy";

const _ReactPlayer = (props: { url: string }) => <ReactPlayer url={props.url} controls/>;
export default _ReactPlayer;
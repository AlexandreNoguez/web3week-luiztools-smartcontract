import { generateAvatarURL } from "@cfx-kit/wallet-avatar"

export default function Tweet(props) {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-slate-400 my-2 max-w-2xl flex flex-col justify-center items-center">
        {/* <img className="tweet_author_logo" src={generateAvatarURL(props.data.author)} /> */}
        <div className="flex flex-col w-full items-center gap-1 ">
          <div className="flex justify-between gap-4">
            <div>
              {props.data.username}
            </div>
            <div className="tweet_author_slug">
              @{props.data.author}
            </div>
          </div>
          <div className="tweet_publish_time">
            at {new Date(Number(props.data.timestamp) * 1000).toLocaleString()}
          </div>
          <div>
            {props.data.text}
          </div>
        </div>
      </div>
    </div>
  )
}
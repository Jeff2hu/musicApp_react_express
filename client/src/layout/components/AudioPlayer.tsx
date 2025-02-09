const AudioPlayer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-800/50 to-black backdrop-blur-lg p-5 px-8">
      <div className="flex items-center justify-between">
        {/* 左側：歌曲資訊 */}
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="logo" className="size-14 rounded" />
          <div>
            <h4 className="text-white font-medium">歌曲名稱</h4>
            <p className="text-zinc-400 text-sm">歌手名稱</p>
          </div>
        </div>

        {/* 中間：播放控制 */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-6">
            <button className="text-zinc-400 hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>
            <button className="text-white bg-white rounded-full p-2">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <button className="text-zinc-400 hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>
          </div>

          {/* 進度條 */}
          <div className="flex items-center gap-2 w-96">
            <span className="text-xs text-zinc-400">0:00</span>
            <div className="flex-1 h-1 bg-zinc-600 rounded-full">
              <div className="w-1/3 h-full bg-white rounded-full"></div>
            </div>
            <span className="text-xs text-zinc-400">3:45</span>
          </div>
        </div>

        {/* 右側：音量控制 */}
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-zinc-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
          <div className="w-24 h-1 bg-zinc-600 rounded-full">
            <div className="w-1/2 h-full bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

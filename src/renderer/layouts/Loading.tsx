import LoadingBackground from "@r/assets/videos/loading-background.mp4";

export default function Loading(){
  return (
    <div className="absolute h-full w-full">
      <video
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src={LoadingBackground} type="video/mp4" />
      </video>
      <div className="absolute inset-0 grid place-items-center">
        <p className="text-white text-2xl animate-pulse">
          Starting BreezeOS Native...
        </p>
      </div>
    </div>
  )
}
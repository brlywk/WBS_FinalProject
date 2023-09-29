import 'daisyui/dist/full.css'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="loading loading-ring loading-lg"></div>
    </div>
  );
}


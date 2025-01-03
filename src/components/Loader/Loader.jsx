import { CircularProgress } from "@nextui-org/react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-100">
      <CircularProgress
        classNames={{
          svg: "w-36 h-36 drop-shadow-md",
          indicator: "text-grey-500",
          track: "stroke-gray-200",
        }}
        strokeWidth={4}
        label="Loading..."
      />
    </div>
  );
}

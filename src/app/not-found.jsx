import React from 'react'
import Link from 'next/link';
import { TrainTrack, Fish, Squirrel } from "lucide-react";

export const runtime = "edge";

const NotFound = () => {
  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center text-center gap-6 font-bold">
      <h1 className="text-2xl">404</h1>
      <span className="text-xl">"Uh -Oh</span>
      <p>We got lost,</p>{" "}
      <p>
        but don't worry{" "}
        <Link href="/" className="underline">
          click here
        </Link>{" "}
        to get back on track
      </p>
      <div className="flex gap-10">
        <TrainTrack size={40} />
        <Fish size={40} />
        <Squirrel size={40} />
      </div>
    </div>
  );
}

export default NotFound
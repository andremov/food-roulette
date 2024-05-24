"use client";

import { Roulette } from "~/components/roulette";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-emerald-800 to-emerald-900 p-8 text-white">
      <div className="absolute left-0 top-0 h-screen w-screen bg-[url('/felt.jpg')] bg-repeat opacity-[7%]"></div>

      <h1 className="text-3xl font-bold">Food Roulette</h1>

      <div className="">
        <Roulette />
      </div>

      <div></div>
    </main>
  );
}

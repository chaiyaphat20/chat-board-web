'use client'

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="w-full">
      <h1>{JSON.stringify(session)}</h1>
    </div>
  );
}
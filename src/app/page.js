"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session, status} = useSession();
  if(status === 'loading') {
    return <p>Please wait...</p>
  }
  return (
    <>
    {status === 'authenticated' ? 'I am loggded in as  ' + session.user?.name : 'Hello World!'}
    </>
  )
}

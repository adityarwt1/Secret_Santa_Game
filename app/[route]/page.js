import React from 'react'

async function page({params}) {
    const route = (await params).route

  return (
    <>
    <div className='flex justify-center items-center h-screen text-2xl'>
        <div>{route} Not mention in Secret santa Game </div>
        <Link href="/">Back to Home page</Link>
    </div>
    </>
  )
}

export default page
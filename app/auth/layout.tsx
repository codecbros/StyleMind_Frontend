import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid lg:grid-cols-2 2xl:grid-cols-5 gap-8 items-center py-3'>{children}</div>
  )
}

import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid lg:grid-cols-5 gap-4 items-center justify-center pt-3'>{children}</div>
  )
}

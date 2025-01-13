import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-100px)] lg:mb-5'>
      <div className='bg-white/50 dark:bg-neutral-900/20 lg:p-14 rounded-xl shadow-xl'>
        <div className='grid lg:grid-cols-2 2xl:grid-cols-5 gap-8 items-center'>{children}</div>
      </div>
    </div>
  )
}

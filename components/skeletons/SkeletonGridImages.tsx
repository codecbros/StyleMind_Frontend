type SkeletonGridProps = {
  count: number
}

export function SkeletonGrid({ count }: SkeletonGridProps) {
  const skeletonItems = Array.from({ length: count })

  return (
    <ul className='mt-10 grid grid-cols-1 sm:grid-cols-2 sm:gap-y-20 lg:grid-cols-4 gap-10'>
      {skeletonItems.map((_, index) => (
        <li key={index} className='relative h-32 rounded-md shadow-lg bg-gray-200 animate-pulse'></li>
      ))}
    </ul>
  )
}

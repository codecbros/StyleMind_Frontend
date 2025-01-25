'use client'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import ProfileForm from '@/components/profile/ProfileForm'
import ProfileView from '@/components/profile/ProfileView'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <h1 className='text-center text-xl lg:text-3xl uppercase font-extrabold'>perfil</h1>
      <section className='w-full lg:w-3/4 2xl:w-3/5 flex justify-center mx-auto'>
        <Card className='p-5 mt-3 w-full border border-muted-foreground shadow-xl'>
          <h4 className='mb-3 text-lg lg:text-xl font-semibold'>
            Completa tu perfil: Cuanta más información proporciones, mejores serán las combinaciones
          </h4>

          {isEditing ? (
            <ProfileForm setIsEditing={setIsEditing} isEditing={isEditing} />
          ) : (
            <ProfileView setIsEditing={setIsEditing} isEditing={isEditing} />
          )}
        </Card>
      </section>
    </>
  )
}

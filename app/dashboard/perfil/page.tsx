'use client'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import ProfileForm from '@/components/profile/ProfileForm'
import ProfileView from '@/components/profile/ProfileView'
import ContainerLayout from '@/components/ContainerLayout'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <h1 className='text-center text-2xl lg:text-3xl uppercase font-extrabold'>perfil</h1>
      <ContainerLayout>
        <Card>
          <h4 className='mb-3 text-lg  font-semibold'>Completa tu perfil: Cuanta más información proporciones, mejores serán las combinaciones</h4>

          {isEditing ? (
            <ProfileForm setIsEditing={setIsEditing} isEditing={isEditing} />
          ) : (
            <ProfileView setIsEditing={setIsEditing} isEditing={isEditing} />
          )}
        </Card>
      </ContainerLayout>
    </>
  )
}

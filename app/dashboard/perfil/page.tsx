'use client'
import { Button } from '@/components/ui/button'
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
          <h4 className='mb-3 text-lg font-semibold'>
            Completa tu perfil: Cuanta más información proporciones, mejores serán las combinaciones
          </h4>

          {isEditing ? <ProfileForm /> : <ProfileView />}

          <div className='mt-5'>
            {isEditing ? (
              <div className='flex justify-between items-center'>
                <Button className='font-semibold' type='submit'>
                  Guardar
                </Button>
                <Button
                  className='font-semibold'
                  type='button'
                  variant='outline'
                  onClick={() => setIsEditing(!isEditing)}
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <Button
                className='font-semibold'
                type='button'
                onClick={() => setIsEditing(!isEditing)}
              >
                Editar
              </Button>
            )}
          </div>
        </Card>
      </section>
    </>
  )
}

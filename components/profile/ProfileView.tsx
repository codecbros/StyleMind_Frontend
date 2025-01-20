import { useAuthStore } from '@/store/auth.store'
import React from 'react'

export default function ProfileView() {
  return (
    <div className='flex flex-col gap-3'>
      <section className='space-y-4'>
        <h4 className='text-lg font-semibold'>Información Básica</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-sm font-semibold text-gray-500'>Nombres</p>
            <span className='text-sm text-gray-600'>No especificado</span>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-medium text-gray-500'>Nombres</p>
            <span className='text-sm text-gray-600'>No especificado</span>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-medium text-gray-500'>Nombres</p>
            <span className='text-sm text-gray-600'>No especificado</span>
          </div>
        </div>
      </section>
      <section className='space-y-4'>
        <h4 className='text-lg font-semibold'>información Personal</h4>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-medium text-gray-500'>Nombres</p>
            <span className='text-sm text-gray-600'>No especificado</span>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-medium text-gray-500'>Nombres</p>
            <span className='text-sm text-gray-600'>No especificado</span>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-medium text-gray-500'>Nombres</p>
            <span className='text-sm text-gray-600'>No especificado</span>
          </div>
        </div>
      </section>
      <section className='space-y-4'>
        <h4 className='text-lg font-semibold'>Catacreristicas Fisicas</h4>
        <div className='grid grid-cols-1'>
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-medium text-gray-500'>Tono de piel</p>
            <span className='text-sm text-gray-600'>No especificado</span>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-medium text-gray-500'>Nombres</p>
            <span className='text-sm text-gray-600'>No especificado</span>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-medium text-gray-500'>Nombres</p>
            <span className='text-sm text-gray-600'>No especificado</span>
          </div>
        </div>
        <div className='grid grid-cols-1'>
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-medium text-gray-500'>Tono de piel</p>
            <textarea disabled className='text-sm text-gray-600 p-2'>
              No especificado
            </textarea>
          </div>
        </div>
      </section>
      <section>
        <div className='grid grid-cols-1'>
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-medium text-gray-500'>Descripcion del perfil</p>
            <textarea disabled className='text-sm text-gray-600 p-2'>
              No especificado
            </textarea>
          </div>
        </div>
      </section>
    </div>
  )
}

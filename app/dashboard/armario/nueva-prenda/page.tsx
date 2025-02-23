import ContainerLayout from '@/components/ContainerLayout'
import ImageUploader from '@/components/ImageUpload'

export default function page() {
  return (
    <div>
      <ContainerLayout>
        <ImageUploader />
      </ContainerLayout>
    </div>
  )
}

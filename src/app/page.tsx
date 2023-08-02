import Counter from '@/components/Counter'
import Image from 'next/image'
import PhotoList from '@/components/PhotoList'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  justify-between p-24">
      {/* <Counter defaultCounter={0} description="Test counter implementation"/> */}
      <PhotoList />
    </main>
  )
}

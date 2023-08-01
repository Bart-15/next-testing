import Counter from '@/components/Counter'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Counter defaultCounter={0} description="Test counter implementation"/>
    </main>
  )
}

import Counter from '@/components/Counter'
import Image from 'next/image'
import PhotoList from '@/components/PhotoList'
import User from '@/components/User'
import CarBrands from '@/components/CarBrands'
import { MySwrConfig } from '@/components/CarBrands/MySwrConfig'
import SignIn from '@/components/SignIn'


if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
  import('../mocks').then(({ setupMocks }) => {
    setupMocks()
  })
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  justify-between p-24">
      {/* <Counter defaultCounter={0} description="Test counter implementation"/> */}
      {/* <PhotoList /> */}
      {/* <User />  */}

      {/* Note: This is for swr config, don't mind the folder and file structure for the swr config */}
      {/* <MySwrConfig>
        <CarBrands />
      </MySwrConfig> */}

      {/* React hook form */}
      <SignIn />
    </main>
  )
}

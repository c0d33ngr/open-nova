import type { NextPage } from 'next'
import logo from "../assets/logo.svg"
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src={logo} height="100%" width="100%" />
    </div>
  )
}

export default Home

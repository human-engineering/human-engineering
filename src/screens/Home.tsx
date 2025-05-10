import React, { useRef, } from 'react'
import BlockBox from '../components/blocks/BlockBox'
import HeroBlock from '../components/blocks/HeroBlock'

export interface IHomeProps {

}
function Home({ }: IHomeProps) {
  const masterRef = useRef<any>(null)

  return (
    <>
      <BlockBox masterRef={masterRef}>
        <HeroBlock order={0} />
      </BlockBox>
    </>
  )
}

export default Home

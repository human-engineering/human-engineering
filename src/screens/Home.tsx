import React, { useRef, } from 'react'
import BlockBox from '../components/blocks/BlockBox'
import MediaBlock from '../components/blocks/MediaBlock'

export interface IHomeProps {

}
function Home({ }: IHomeProps) {
  const masterRef = useRef<any>(null)

  return (
    <>
      <BlockBox masterRef={masterRef}>
        <MediaBlock order={0} />
      </BlockBox>
    </>
  )
}

export default Home

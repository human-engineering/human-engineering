import React, { } from 'react'

interface IBlurBackgroundProps {
  dark?: boolean,
  zIndex?: number,
  blur?: number,
}
function BlurBackground({ dark, zIndex, blur, }: IBlurBackgroundProps) {
  return (
    <>
      <div style={{
        // filter: 'blur(1px)',
        position: 'absolute', zIndex: zIndex || -1, width: '100%', height: '100%',
        backgroundColor: dark ? 'rgba(0, 0, 0, 0.7)' : undefined,
        backdropFilter: `blur(${blur || 100}px)`,
        WebkitBackdropFilter: `blur(${blur || 100}px)`,
      }} />
    </>
  )
}

export default BlurBackground

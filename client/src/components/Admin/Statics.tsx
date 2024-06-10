import React from 'react'
import ScatterData from './Staticpage parts/ScatterData'
import PieData from './Staticpage parts/PieData'
import TopSelling from './Staticpage parts/TopSelling'
import TopRated from './Staticpage parts/TopRated'

const Statics = () => {
  return (
    <div>
        <ScatterData/>
        <PieData/>
        <TopSelling/>
        <TopRated/>
    </div>
  )
}

export default Statics
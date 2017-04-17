import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import R from 'rambda'

import './Card.css'


const getStyle = (x, y) => ({
  WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
  transform: `translate3d(${x}px, ${y}px, 0)  rotate(${0}deg)`,
  position: 'absolute',
})


const springConfig = {
  stiffness: 170,
  damping: 27
}


const getSprings = (x, y) => ({
  x: spring(x, springConfig),
  y: spring(y, springConfig)
})


const defaultMapXYZ = i => ({
  x: i * 4,
  y: i * 4,
  z: i
})


class Card extends Component {
  constructor (props) {
    super(props)
    this.state = { rotationY: 0 }
    this.flipCard = this.flipCard.bind(this)
  }

  flipCard () {
    const currentDegrees = this.state.rotationY
    const nextDegrees = currentDegrees === 0 ? 180 : 0
    this.setState({ rotationY: nextDegrees })
  }

  render () {
    const { index, mapXYZ, size} = this.props
    const defaultSize = 60 // px size of cards preset animation funcs based on
    const scale = size / defaultSize
    

    const defaultStyle = getStyle(index * 3, index * 2) // initial coords
    const { x, y } = mapXYZ(index) // coords to interpolate to
    const scaledX = x * scale  // scale coords for card size
    const scaledY = y * scale
    const sprungRange = getSprings(scaledX, scaledY)

    return (
      <div onMouseEnter={this.flipCard} onMouseLeave={this.flipCard}>
       <Motion defaultStyle={{ x: 1800, y: 1000 }} style={sprungRange}> 
        {({x, y}) => // interpolated x, y values
        <div
          style={getStyle(x, y, index)}
          className='container'>
         <Card 
           size={size}
           index={index}
           faceDown={this.props.faceDown}
           doubleBacked={this.props.doubleBacked}
           rotationY={this.state.rotationY}
         />
       </div>
      }
      </Motion>
      </div>
    )
  }
}

export default Card

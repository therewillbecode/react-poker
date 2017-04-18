import React, { PureComponent } from 'react'
import { Motion, spring } from 'react-motion'
import R from 'rambda'
import { fromJS } from 'immutable'

import './Card.css'
import Card from './Card'

const getStyle = (x, y, width, height) => ({
  WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
  transform: `translate3d(${x}px, ${y}px, 0)  rotate(${0}deg)`,
  position: 'absolute',
  width: `${width}px`,
  height: `${height}px`
})

const springConfig = {
  stiffness: 170,
  damping: 27,
  precision: 0.01
}

const getSprings = (x, y) => ({
  x: spring(x, springConfig),
  y: spring(y, springConfig)
})


//change back to pure component - TODO
class CardContainer extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { rotationY: fromJS(0) }
    this.flipCard = this.flipCard.bind(this)
  }


  flipCard () {
    const currentDegrees = this.state.rotationY
    const nextDegrees = fromJS(currentDegrees === 0 ? 180 : 0)
    this.setState({ rotationY: nextDegrees })
  }

  render () {
    const { index, mapXYZ, size } = this.props
    const { rotationY } = this.state
    const defaultSize = 60 // px size of cards preset animation funcs based on
    const scale = size / defaultSize
    const width = size * 0.75
    const height = size
    const defaultStyle = getStyle(index, index, width, height) // initial coords
    const { x, y } = mapXYZ(index) // coords to interpolate to
    const scaledX = x * scale  // scale coords for card size
    const scaledY = y * scale
    const sprungRange = getSprings(scaledX, scaledY)

    return (
      <div onMouseEnter={this.flipCard} onMouseLeave={this.flipCard}>
       <Motion defaultStyle={{ x: 1800, y: 1000 }} style={sprungRange}> 
        {({x, y}) => // interpolated x, y values
        <div
          style={getStyle(x, y, width, height)}
          className='container'
        >
         <Card
           size={size}
           index={index}
           faceDown={this.props.faceDown}
           doubleBacked={this.props.doubleBacked}
           rotationY={rotationY}
         />
       </div>
      }
      </Motion>
      </div>
    )
  }
}

export default CardContainer

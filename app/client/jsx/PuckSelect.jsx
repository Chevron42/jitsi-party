import React, { Component } from 'react'
import PuckBox from './PuckBox.jsx'
import { Avatars } from './avatars.jsx'

class PuckSelect extends Component {
  constructor (props) {
    super(props)
    this.initialState = {
      columnOpen: false,
      rowOpen: null,
      avatarDesign: '',
      avatarColorway: '',
      opacity: this.props.opacity
    }
    this.state = this.initialState
  }

  handleButtonClick () { this.setState({ columnOpen: true }) }

  handleButtonClickReset () {
    this.setState(this.initialState)
    this.setState({ columnOpen: true })
  }

  handleClickDesign (key, index) {
    this.setState({ avatarDesign: key, rowOpen: index })
  }

  handleClickColor (variantKey) {
    this.setState({ avatarColorway: variantKey })
    this.props.handleSelect({
      type: this.state.avatarDesign,
      color: variantKey
    })
  }

  render () {
    if (this.state.avatarColorway === '') { // checks whether selection not yet complete
      let allAvatarDesigns = []
      let allColorwayVariants = []
      let fade = this.props.opacity

      if (this.state.columnOpen) { // checks whether selection begun by clicking button, opening column
        fade = 'fade'
        allAvatarDesigns = Object.keys(Avatars).map((key, index) => {
          if (this.state.rowOpen !== index) { // checks each item in column for whether selected
            const handleClick = () => this.handleClickDesign(key, index)
            let imageTransparency = 'image'
            if (this.state.rowOpen !== null && this.state.rowOpen !== index) {
              imageTransparency = 'non-selected-image'
            }

            return ( // returns single instance of each nonselected design
              <PuckBox
                handleClick={handleClick.bind(this)}
                key={key}
                image={Avatars[key].purple}
                style='box'
                imageStyle={imageTransparency}
              />
            )
          } else { // selected design
            allColorwayVariants = Object.keys(Avatars[key]).map((variantKey, colorIndex) => {
              const selected = 'image'
              const handleClick = () => this.handleClickColor(variantKey, colorIndex)
              return ( // returns all colorways for selected design
                <PuckBox
                  handleClick={handleClick.bind(this)}
                  key={variantKey}
                  image={Avatars[key][variantKey]}
                  imageStyle={selected}
                />
              )
            })
            return ( // colorways row in place of selected column item
              <div className='inner'>
                {allColorwayVariants}
              </div>
            )
          }
        })
      }
      return ( // column of singleton nonselected items with at most one of them swapped out for colorway variants row
        <div className='outer'>
          <input className={fade} type='button' onClick={this.handleButtonClick.bind(this)} value='Pick your puck' />
          {allAvatarDesigns}
        </div>
      )
    } else {
      return ( // when avatar state isn't null, collapse all and display choice
        <div className='outer'>
          <input className='fade' type='button' onClick={this.handleButtonClickReset.bind(this)} value='Pick your puck' />
          <div className='spacer' />
          <div><img className='image' src={Avatars[this.state.avatarDesign][this.state.avatarColorway]} /></div>
        </div>
      )
    }
  }
}
export default PuckSelect

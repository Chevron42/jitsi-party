import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import reducers from './reducers.jsx'
import { Link, Redirect } from 'react-router-dom'
import PuckSelect from './PuckSelect.jsx'

class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayName: this.props.displayName,
            avatar: this.props.avatar,
            redirect: null
        }
    }

    handleDisplayNameChange(event) {
        this.setState({ displayName: event.target.value })
    }

    handleAvatarSelect(selection) { this.setState({ avatar: selection }) }

    handleReady() {
        this.props.updateDisplayName(this.state.displayName)
        this.props.updateAvatar(this.state.avatar)
        this.props.updateCurrentRoom('vestibule')
        this.setState({ redirect: '/party' })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        let text_entry = {
          padding: '6px 10px',
          border: '2px solid #D6D3CD',
          backgroundColor: '#D6D3CD',
          borderRadius: '7px',
          color: '#1B1E1F',
          outline: 'none',
          boxShadow: 'none',
          fontSize: '20px'
        }

        let name_opacity = 'form-fade'
        let avatar_opacity = 'form-fade'
        let party_opacity = 'form-fade-party'
        if (this.state.displayName=='') { name_opacity = 'form' }
        if (this.state.displayName) { avatar_opacity = 'form' }
        if (this.state.displayName && this.state.avatar) { party_opacity = 'form-party' }

        return (
            <div className="vestibule">
                <br/>
                <div className='serif'>You've met with a terrible fate, haven't you?</div>
                <h1>Cabin Weekend is Dead. Long Live Cabin Fever.</h1>
                <img className='splash' src='./js/images/party.png'/>
                <input style={text_entry} autoComplete="off" className={name_opacity} type="text" placeholder="Name" name="name" minLength="1" onChange={this.handleDisplayNameChange.bind(this)}/><br/>
                <PuckSelect opacity={avatar_opacity} handleSelect={this.handleAvatarSelect.bind(this)} />
                <input id='button' className={party_opacity} type="button" onClick={this.handleReady.bind(this)} value="Party" disabled={!this.state.displayName} />
            </div>
        )

    }
}

export default connect(
    state => state,
    {
        updateDisplayName: reducers.updateDisplayNameActionCreator,
        updateAvatar: reducers.updateAvatarActionCreator,
        updateCurrentRoom: reducers.updateCurrentRoomActionCreator
     })(Welcome)

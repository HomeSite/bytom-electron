import React from 'react'
import styles from './Main.scss'
import {DropdownButton, MenuItem} from 'react-bootstrap'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import actions from 'actions'
import { Navigation, SecondaryNavigation } from '../'

class Main extends React.Component {

  constructor(props) {
    super(props)

    this.toggleDropdown = this.toggleDropdown.bind(this)
  }

  toggleDropdown(event) {
    event.stopPropagation()
    this.props.toggleDropdown()
  }

  render() {
    let logo = require('images/logo-bytom-white.svg')

    return (
      <div className={styles.main}
           onClick={this.props.closeDropdown} >
        <div className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <div className={styles.logo}>
              <Link to={'/'}>
                <img src={logo} className={styles.brand_image} />
              </Link>

              <DropdownButton
                className={styles.languages}
                bsSize='xsmall'
                noCaret
                pullRight
                id='input-dropdown-addon'
                title={this.props.lang === 'zh' ? '中' : 'EN'}
                onSelect={this.props.setLang}
              >
                <MenuItem eventKey='zh'>中文</MenuItem>
                <MenuItem eventKey='en'>ENGLISH</MenuItem>
              </DropdownButton>

              <span>
                <span className={styles.settings} onClick={this.toggleDropdown}>
                  <img src={require('images/navigation/settings.png')}/>
                </span>
                {this.props.showDropwdown && <SecondaryNavigation/>}
              </span>
            </div>

            <Navigation />
          </div>
        </div>

        <div className={`${styles.content} flex-container`}>
          {!this.props.connected && <div className={styles.connectionIssue}>
            There was an issue connecting to Chain Core. Please check your connection while dashboard attempts to reconnect.
          </div>}
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    canLogOut: state.core.requireClientToken,
    lang: state.core.lang,
    connected: true,
    showDropwdown: state.app.dropdownState == 'open',
  }),
  (dispatch) => ({
    toggleDropdown: () => dispatch(actions.app.toggleDropdown),
    closeDropdown: () => dispatch(actions.app.closeDropdown),
    setLang: (event) => {
      dispatch({
        type: 'UPDATE_CORE_LANGUAGE',
        lang: event
      })
    }
  })
)(Main)

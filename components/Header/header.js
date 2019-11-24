import Link from 'next/link'
import PropTypes from 'prop-types'
import { Figure, Header, Menu } from './style'

const MainHeader = ({ name, picture }) => {
  return (
    <Header>
      <Link href="/home" as="/">
        <a>
          <Figure>
            <img src={picture} alt={`${name} logo`} />
            <h2>{name}</h2>
          </Figure>
        </a>
      </Link>
      <Menu>
        <Link href='#' as='#'>
          <a>Login</a>
        </Link>
        <Link href='#' as='#'>
          <a>Subscribe</a>
        </Link>
      </Menu>
    </Header>
  )
}

Header.propTypes = {
  name: PropTypes.string,
  picture: PropTypes.string,
}

export default MainHeader

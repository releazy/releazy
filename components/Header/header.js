import { Figure, Header, Menu } from './style'
import Link from 'next/link'

const MainHeader = ({ name, picture }) => {
  return (
    <Header>
      <Figure>
        <img src={picture} alt={`${name} logo`} />
        <h2>{name}</h2>
      </Figure>
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

export default MainHeader

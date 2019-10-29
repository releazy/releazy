import Link from 'next/link'
import { Item } from './style'

const Repository = ({ name, slug, description }) => {
  return (
    <Link href={`repos/${slug}`} as={`repos/${slug}`}>
      <Item>
        <h3>{name}</h3>
        <p>{description}</p>
      </Item>
    </Link>
  )
}

export default Repository

import Link from 'next/link'
import PropTypes from 'prop-types'
import { Item } from './style'

const Repository = ({ name, slug, description }) => {
  return (
    <Link href={`/repos/${slug}`} as={`/repos/${slug}`}>
      <Item>
        <h3>{name}</h3>
        <p>{description || 'No description'}</p>
      </Item>
    </Link>
  )
}

Repository.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default Repository

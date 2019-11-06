import Link from 'next/link'
import { Item } from './style'

const Tag = ({ id, notes }) => {
  return (
    <Item>
      <h3>{id}</h3>
      <div className="entry-content">
        {notes || ''}
      </div>
    </Item>
  )
}

export default Tag

import MarkdownIt from 'markdown-it'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Item, Content } from './style'

const mardown = new MarkdownIt()
const Tag = ({ id, notes }) => {
  return (
    <Item>
      <h3 className="title">{id}</h3>
      <Content className="entry-content" dangerouslySetInnerHTML={{__html: mardown.render(notes)}}></Content>
    </Item>
  )
}

Tag.propTypes = {
  id: PropTypes.string.isRequired,
  notes: PropTypes.string,
}

export default Tag

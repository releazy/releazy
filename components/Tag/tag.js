import MarkdownIt from 'markdown-it'
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

export default Tag

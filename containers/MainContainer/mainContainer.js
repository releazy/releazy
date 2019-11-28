import Header from '../../components/Header'
import Tag from '../../components/Tag'
import Repository from '../../components/Repository'
import { Container } from './style'

const MainContainer = ({ org, repos, tags, activeRepository }) => (
  <>
    <Header name={org.name} picture={org.avatar_url} />
    <Container>
      {!activeRepository && repos.length > 0 && repos.map((repo, key) => (
        <Repository key={key} name={repo.name} slug={repo.name} description={repo.description} />
      ))}

      {tags.length > 0 && tags.map((tag, key) => (
        <Tag key={key} id={tag.id} notes={tag.notes} />
      ))}
    </Container>
  </>
)

export default MainContainer

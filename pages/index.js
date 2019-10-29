import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Header from '../components/Header'
import Repository from '../components/Repository'
import MainContainer from '../containers/MainContainer'
import { clientCredentials } from '../credentials/firebase/client'
import '../style.css'

class Index extends React.Component {
  static async getInitialProps({ req }) {
    const { subdomain } = req
    return { subdomain }
  }

  constructor (props, items) {
    super(props)
    this.state = {
      subdomain: this.props.subdomain,
      org: null,
      repos: [],
      tags: [],
    }
  }

  componentDidMount() {
    const database = firebase.initializeApp(clientCredentials).firestore()

    if (!this.state.subdomain || this.state.subdomain === '') {
      return false
    }

    const organizationRef = database.collection('organization').doc(this.state.subdomain)
    const repositoryRef = database.collection('repository').get()
      .then(snapshot => {
        snapshot.forEach(repo => {
          const { ref, id } = repo
          const organization = repo.data().organization

          if (organization && organizationRef.isEqual(organization)) {
            this.setState({
              repos: [ ...this.state.repos, { ...repo.data(), id, ref }]
            })
          }
        })
      })

    const tagsRef = database.collection('tags').get()
      .then(snapshot => {
        snapshot.forEach(tag => {
          const repository = tag.data().repository
          const { ref, id } = tag
          const { repos, tags } = this.state

          Object.keys(repos).map(key => {
            if (repository && repos[key].ref.isEqual(repository)) {
              this.setState({ tags: [...tags, { ...tag.data(), id, ref }]})
            }
          })
        })
      })

    organizationRef.get()
      .then(doc => {
        if (doc.exists) {
          this.setState({org: doc.data()})
        }
      })
  }

  render() {
    const { org, repos, tags } = this.state
    return (
      <main>
        {org && repos ? (
          <div>
            <Header name={org.name} picture={org.avatar_url} />

            <MainContainer>
              {repos.map((repo, key) => (
                <Repository key={key} name={repo.name} slug={repo.name} description={repo.description} />
              ))}

              {tags.map((tag, key) => {
                return (
                  <div>
                    <h3>{tag.id}</h3>
                    <div className="entry-content">
                      {tag.notes || ''}
                    </div>
                  </div>
                )
              })}
            </MainContainer>
          </div>
        ) : (
          <div>home</div>
        )}
      </main>
    )
  }
}

export default Index

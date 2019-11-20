import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Tag from '../components/Tag'
import Header from '../components/Header'
import Repository from '../components/Repository'
import MainContainer from '../containers/MainContainer'
import { clientCredentials } from '../credentials/firebase/client'
import '../style.css'

class Index extends React.Component {
  static async getInitialProps({ req }) {
    const { subdomain, firebaseServer } = req

    try {
      const database = firebaseServer.firestore()
      const organizationRef = database.collection('organization').doc(subdomain)
      const repositoryRef = database.collection('repository')
      const tagRef = database.collection('tags')

      const organization = await organizationRef.get()
      const repositoriesList = await repositoryRef.get()
      const tagsList = await tagRef.get()

      const org = organization.data()
      const repos = []
      const tags = []

      repositoriesList.forEach(repo => {
        const { ref, id } = repo
        const repositoryOrgRef = repo.data().organization

        if (repositoryOrgRef && organizationRef.isEqual(repositoryOrgRef)) {
          repos.push({ ...repo.data(), id, ref })

          tagsList.forEach(tag => {
            const tagRepoRef = tag.data().repository
            const { ref, id } = tag

            if (tagRepoRef && tagRepoRef.isEqual(repo.ref)) {
              tags.push({ ...tag.data(), id, ref })
            }
          })
        }
      })

      return {
        org,
        repos,
        tags,
        subdomain,
      }
    } catch (error) {
      console.error(error)
      return { subdomain }
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      subdomain: props.subdomain,
      org: props.org || null,
      repos: props.repos || [],
      tags: props.tags || [],
    }
  }

  componentDidMount() {
    const database = firebase.initializeApp(clientCredentials).firestore()

    if (!this.state.subdomain || this.state.subdomain === '') {
      return false
    }

    if (!this.state.org || !this.state.repos.length || !this.state.tags.length) {
      console.log('front-end')
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

      organizationRef.get()
        .then(doc => {
          if (doc.exists) {
            this.setState({org: doc.data()})
          }
        })

      const tagsRef = database.collection('tags').get()
        .then(snapshot => {
          snapshot.forEach(tag => {
            const repository = tag.data().repository
            const { ref, id } = tag
            const { repos, tags } = this.state

            Object.keys(repos).map(key => {
              if (repository && repos[key].ref && repos[key].ref.isEqual(repository)) {
                this.setState({ tags: [...tags, { ...tag.data(), id, ref }]})
              }
            })
          })
        })
    }
  }

  render() {
    const { org, repos, tags } = this.state
    return (
      <main>
        {org ? (
          <div>
            <Header name={org.name} picture={org.avatar_url} />

            <MainContainer>
              {repos.length > 0 ? (
                repos.map((repo, key) => (
                  <Repository key={key} name={repo.name} slug={repo.name} description={repo.description} />
                ))
              ) : (
                <div>Oops! No repos were found.</div>
              )}

              {tags.length > 0 ? (
                tags.map((tag, key) => <Tag key={key} id={tag.id} notes={tag.notes} />)
              ) : (
                <div>Oops! No tags were found.</div>
              )}
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

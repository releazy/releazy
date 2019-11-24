import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Tag from '../components/Tag'
import Header from '../components/Header'
import MainContainer from '../containers/MainContainer'
import { clientCredentials } from '../credentials/firebase/client'
import { getOrganization, getRepositories, getTags } from '../data/firebase'
import '../style.css'

class Index extends React.Component {
  static async getInitialProps({ req, query }) {
    const { subdomain, firebaseServer } = req
    const { activeRepository } = query

    if (!subdomain || subdomain === '') {
      return { subdomain: null }
    }

    try {
      const database = firebaseServer.firestore()
      const { organization, ref: organizationRef } = await getOrganization(database, subdomain)
      const { repositories: repositoriesList } = await getRepositories(database)
      const { tags: tagsList } = await getTags(database)

      const org = organization.data()
      const repos = []
      const tags = []

      repositoriesList.forEach(repo => {
        const { ref, id } = repo
        const { name, organization: repositoryOrgRef } = repo.data()

        if (!repositoryOrgRef || !organizationRef.isEqual(repositoryOrgRef)) {
          return false
        }

        if (activeRepository && activeRepository !== name) {
          return false
        }

        repos.push({ ...repo.data(), id, ref })

        tagsList.forEach(tag => {
          const tagRepoRef = tag.data().repository
          const { ref, id } = tag

          if (tagRepoRef && tagRepoRef.isEqual(repo.ref)) {
            tags.push({ ...tag.data(), id, ref })
          }
        })
      })

      return {
        org,
        repos,
        tags,
        subdomain,
        activeRepository,
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
      activeRepository: props.activeRepository || null,
      org: props.org || null,
      repos: props.repos || [],
      tags: props.tags || [],
    }
  }

  async componentDidMount() {
    try {
      const database = firebase.initializeApp(clientCredentials).firestore()
      const { subdomain } = this.state

      if (!subdomain || subdomain === '') {
        return false
      }

      if (!this.state.org || !this.state.repos.length || !this.state.tags.length) {
        console.log('front-end')

        const { organization, ref: organizationRef } = await getOrganization(database, subdomain)
        const { repositories: repositoriesList } = await getRepositories(database)
        const { tags: tagsList } = await getTags(database)

        if (!organization.exists) {
          return false
        }

        this.setState({ org: organization.data() })

        repositoriesList.forEach(repo => {
          const { ref, id } = repo
          const repositoryOrgRef = repo.data().organization

          if (!repositoryOrgRef || !organizationRef.isEqual(repositoryOrgRef)) {
            return false
          }

          this.setState({ repos: [...this.state.repos, { ...repo.data(), id, ref }] })

          tagsList.forEach(tag => {
            const { ref, id } = tag
            const tags = this.state.tags
            const repository = tag.data().repository

            if (repository && repo.ref.isEqual(repository)) {
              this.setState({ tags: [...tags, { ...tag.data(), id, ref }]})
            }
          })
        })
      }
    } catch (error) {
      console.error('componentDidMount error', error)
    }
  }

  render() {
    const { org, repos, tags, activeRepository } = this.state
    return (
      <main>
        {org ? (
          <div>
            <Header name={org.name} picture={org.avatar_url} />
            <MainContainer activeRepository={activeRepository} repos={repos} tags={tags} />
          </div>
        ) : (
          <div>home</div>
        )}
      </main>
    )
  }
}

export default Index

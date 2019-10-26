import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { clientCredentials } from '../credentials/firebase/client'

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
      repos: null,
      tags: null,
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
        snapshot.forEach(repos => {
          const organization = repos.data().organization

          if (organization && organizationRef.isEqual(organization)) {
            this.setState({ repos })
          }
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
    const { org, repos } = this.state
    return (
      <main>
        {org && repos ? (
          <div>list</div>
        ) : (
          <div>home</div>
        )}
      </main>
    )
  }
}

export default Index

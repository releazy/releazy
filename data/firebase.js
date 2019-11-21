export async function getOrganization(database, subdomain) {
  const ref = database.collection('organization').doc(subdomain)
  const organization = await ref.get()

  return { organization, ref }
}

export async function getRepositories(database) {
  const ref = database.collection('repository')
  const repositories = await ref.get()

  return { repositories, ref }
}

export async function getTags(database) {
  const ref = database.collection('tags')
  const tags = await ref.get()

  return { tags, ref }
}

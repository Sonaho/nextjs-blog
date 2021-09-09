import userSWR from 'swr'

export default function Profile (id) {
  const { data, error } = useSWR(`/api/user/${id}`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  // renderizar datos
  return <div>hello {data.name}!</div>
}

export default function useUser (id) {
    const { data, error } = useSWR(`/api/user/${id}`, fetcher)

    return {
        user: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default function Avatar({ id }) {
   const { user, isLoading, isError } = useUser(id)

   if(isLoading) return <Spinner />
   if (isError) return <Error />
   return <img src={user.avatar} />
}
import Link from 'next/link'

const HomePage = () => (
  <div>
    <h1>Welcome to the TODO App</h1>
    <Link href='/todo'>Go to Todo Page</Link>
  </div>
)

export default HomePage

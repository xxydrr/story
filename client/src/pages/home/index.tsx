import './style.scss'

import { useParams } from 'react-router'
import TopBar from './components/TopBar'
import Suggestion from './components/Suggestion'
import Layout from '~/layouts/default'
import Feed from '~/pages/home/components/Feed'

const Home = () => {
  const username = useParams()?.username

  return (
    <Layout>
      <div className="font-sans bg-grey-light">
        <TopBar></TopBar>
        <div className="container flex flex-col mx-auto mt-3 text-sm leading-normal lg:flex-row">
          <Feed username={username}></Feed>
          <Suggestion ></Suggestion>
        </div>
      </div>
    </Layout>
  )
}

export default Home

import './style.scss'
import Layout from '~/layouts/default'
import Feed from '~/pages/home/components/Feed'
import Suggestion from '~/pages/home/components/Suggestion'

const Home = () => {
  return (
    <Layout>
      <div className="font-sans bg-grey-light">
        <div className="container flex flex-col mx-auto mt-3 text-sm leading-normal lg:flex-row">
          <Feed></Feed>
          <Suggestion></Suggestion>
        </div>
      </div>
    </Layout>
  )
}

export default Home

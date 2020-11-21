import { lazy, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'


import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../types/post'
import Avatar from '../components/avatar'

type Props = {
  allPosts: Post[]
}

const Foo = dynamic(() => import('../components/foo'));

const Index = ({ allPosts }: Props) => {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  // const [show, setShow] = useState(false);
  return (
    <>
      <Layout>
        {/* <div>
          <button onClick={() => { setShow(!show) }}>load another chunk</button>
          { show  && <Foo />}
        </div> */}
        <Head>
          <title>katotetsuro memo</title>
        </Head>
        <Container>
          <Intro />
          <div className="block mb-6">
            <Avatar name='katotetsuro' picture='/assets/blog/authors/icon.jpeg' />
          </div>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              date={heroPost.date}
              slug={heroPost.slug}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}

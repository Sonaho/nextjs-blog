import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from 'next/head'
import Date from '../../components/date'
import utilsStyles from '../../styles/utils.module.css'

export default function Post({ postData}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
        <article>
          <h1 className={utilsStyles.headingXl}>{postData.title}</h1>
          <div className={utilsStyles.lightText}>
            <Date dateString={postData.date}></ Date>
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
        </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
      paths,
      fallback: false
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id)
  return{
      props: {
          postData
      }
  }
}


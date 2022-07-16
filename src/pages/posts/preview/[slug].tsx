import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../../services/prismic";
import Head from "next/head";
import styles from "../post.module.scss";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
interface PrismicResponse {
  title: string;
  content: string[];
  last_publication_date: string;
}

interface PostPreviewProps {
  post: {
    title: string;
    content: string;
    slug: string;
    updatedAt: string;
  };
}
export default function PostPreview({ post }: PostPreviewProps) {
  const { data } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (data?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          <div className={styles.continueReading}>
            Continue lendo
            <Link href={"/"}>
              <a>Inscreva-se</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID<PrismicResponse>(
    "posts",
    String(slug),
    {}
  );
  const post = {
    slug,
    title: RichText?.asText?.(response?.data?.title),
    content: RichText?.asHtml?.(response?.data?.content.splice(0, 3)),
    updatedAt: new Date(response?.last_publication_date!).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };
  return {
    props: {
      post: post,
    },
    revalidate: 60 * 30, // 30 minutes
  };
};

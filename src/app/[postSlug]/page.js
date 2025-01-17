import React from "react";

import BlogHero from "@/components/BlogHero";
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import CodeSnippet from "@/components/CodeSnippet";

const cachedLoadBlogPost = React.cache(loadBlogPost);

export async function generateMetadata({ params }) {
  const { frontmatter } = await cachedLoadBlogPost(params.postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { frontmatter, content } = await cachedLoadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={{ CodeSnippet }} />
      </div>
    </article>
  );
}

export default BlogPost;

import Head from 'next/head'
import * as React from 'react'

import {
  DocsContent,
  DocsTOC,
  MDXPage,
  EditOnGitHubButton,
} from '@guild-docs/client'
import { MDXPaths, MDXProps } from '@guild-docs/server'

import { getRoutes } from '../../../routes'
import { giscus } from '../../giscus-config'

import type { GetStaticPaths, GetStaticProps } from 'next'

export default MDXPage(
  function PostPage({ content, TOC, MetaHead, sourceFilePath }) {
    return (
      <>
        <Head>{MetaHead}</Head>
        <DocsContent>{content}</DocsContent>
        <DocsTOC>
          <TOC />
          <EditOnGitHubButton
            baseDir="website"
            branch="master"
            sourceFilePath={sourceFilePath}
            repo="dotansimha/graphql-yoga"
          />
        </DocsTOC>
      </>
    )
  },
  {
    giscus,
  },
)

export const getStaticProps: GetStaticProps = (ctx) => {
  return MDXProps(
    ({ readMarkdownFile, getArrayParam }) => {
      return readMarkdownFile('docs/', getArrayParam('slug'))
    },
    ctx,
    {
      getRoutes,
    },
  )
}

export const getStaticPaths: GetStaticPaths = (ctx) => {
  return MDXPaths('docs', { ctx })
}

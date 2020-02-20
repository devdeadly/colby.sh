import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image" // example usage below

import Head from "../components/head"
import Layout from "../components/layout"

import { Title, Subtitle } from "../components/styled"
// import "prismjs/themes/prism-tomorrow.css" // for code highlighting
import { withTheme } from "styled-components"

const ContentTemplate = ({
    data, // this prop will be injected by the GraphQL query below.
    theme,
}) => {
    const { markdownRemark } = data // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark
    console.log("fm")
    console.log(frontmatter)

    // TODO: revisit changing code theme on theme toggle
    // if (theme === "dark") {
    // require("prismjs/themes/prism-tomorrow.css")
    // } else {
    //     require("prismjs/themes/prism-solarizedlight.css")
    // }

    return (
        <>
            <Head title={frontmatter.title} />
            <Layout>
                <Title className="title">{frontmatter.title}</Title>
                <Subtitle className="subtitle">{frontmatter.date}</Subtitle>
                <Img
                    fluid={frontmatter.thumbnail.childImageSharp.fluid}
                    alt="colby thomas"
                />
                <div className="blog-post content">
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
            </Layout>
        </>
    )
}

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                title
            }
        }
    }
`

export default withTheme(ContentTemplate)

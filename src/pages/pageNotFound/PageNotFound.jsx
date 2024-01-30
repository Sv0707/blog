import React from 'react'
import Button from '../../ui-kit/components/buttons/Button'
import { metatags } from '../../constants/metatags'
import { Helmet } from 'react-helmet'

export const PageNotFound = () => (
  <>
    <Helmet>
      <title>{metatags.pageNotFound.title}</title>
      <meta content={metatags.pageNotFound.description} name="description" />
      <meta content="noindex, nofollow" name="robots" />
    </Helmet>
    <div className="container">
      <h1 className="mb-4"> Oops! Something went wrong</h1>
      <Button
        className="btn btn-light btn-md mb-4"
        label="Back home"
        link="/"
        type="button"
      />
    </div>
  </>
)

export default PageNotFound

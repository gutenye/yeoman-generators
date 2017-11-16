import './App.css.js'
import HomeDesign from './pages/Home/HomeDesign'
import React, { styled, Helmet } from 'vendor'
import { Guide } from 'gureact'

export default () => {
  return (
    <Root>
      <Guide>
        <Helmet title="Design" />
        <Guide.Artboard type="mobile">
          <HomeDesign />
        </Guide.Artboard>
      </Guide>
    </Root>
  )
}

const Root = styled.div``

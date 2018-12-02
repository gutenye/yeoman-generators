import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const descriptions = {
  '403': '你没有权限',
  '404': '页面未找到',
  '500': '系统错误',
}

const Error = ({ type }) => (
  <Root>
    <div>
      <Title>{type}</Title>
      <Description>{descriptions[type]}</Description>
      <Link to="/">返回主页</Link>
    </div>
  </Root>
)

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
`

const Title = styled.div`
  color: #434e59;
  font-size: 72px;
  font-weight: 600;
  line-height: 72px;
  margin-bottom: 24px;
`

const Description = styled.div`
  color: rgba(0, 0, 0, 0.45);
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 16px;
`

export default Error

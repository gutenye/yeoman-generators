import styled from 'styled-components'

const Logo = styled.div`
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 1px 1px 0 0 #e8e8e8;
  font-weight: bold;
  font-size: 1.2rem;
  background: ${p => p.theme.primary};
  color: ${p => p.theme.textPrimaryOnPrimary};
`

export default Logo

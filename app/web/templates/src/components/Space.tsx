import styled from 'styled-components'

const Space = styled.div<Obj>`
  height: ${props => props.size * 8}px;
`

export default Space

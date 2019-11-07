import styled from 'styled-components'

export const Item = styled.a`
  display: block;
  border: 0;
  border-radius: 4px;
  background: #FFF;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, .12);
  text-align: left;
  width: 100%;
  cursor: pointer;
  margin-top: 24px;

  .title,
  .entry-content {
    padding: 16px;
  }

  .title {
    border-bottom: 1px solid #EDEDED;
  }
`

export const Content = styled.div`
  h3 {
    margin-bottom: 1em;
  }

  p {
    line-height: 1.6em;
  }

  p + p {
    margin-top: 1em;
  }
`

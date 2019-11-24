import styled from 'styled-components'

export const Item = styled.a`
  display: block;
  border: 0;
  border-radius: 4px;
  background: #FFF;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, .12);
  padding: 8px 12px;
  text-align: left;
  width: 100%;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    box-shadow: 1px 1px 6px rgba(0, 0, 0, .4);
  }

  h3 {
    margin-bottom: 5px;
    text-transform: capitalize;
  }

  p {
    color: #666;
    font-size: .9rem;
  }
`

import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, .12);
`

export const Figure = styled.figure`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    max-width: 40px;
    border: 2px solid #E8E8E8;
    border-radius: 100%;
    margin-right: 8px;
  }
`

export const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  a {
    color: #0070f3;
    margin-left: 16px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

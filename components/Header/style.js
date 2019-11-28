import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  min-height: 56px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, .12);

  a {
    cursor: pointer;
    text-decoration: none;
  }
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

  h2 {
    color: #000;
  }
`

export const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  a {
    color: #0070f3;
    margin-left: 16px;

    &:hover {
      text-decoration: underline;
    }
  }
`

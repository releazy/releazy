import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 32px auto;
  text-align: center;
  padding: 0 16px;
`

export const Logo = styled.h1`
  color: #FB880F;
  font-weight: lighter;
  letter-spacing: 1px;
`

export const ReleaseDate = styled.span`
  display: block;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: .7rem;
  margin-top: 1rem;
  font-weight: 500;
`

export const Title = styled.h2`
  display: flex;
  align-items: center;
  height: calc(100vh - 200px);
  font-size: 3rem;
  line-height: 1.2em;
  max-width: 860px;
  margin: 0 auto;
  color: #000;
`

export const Link = styled.a`
  display: inline-block;
  background: #00493D;
  color: #FFF;
  text-decoration: none;
  padding: .6rem 1.5rem;
  line-height: 1.6rem;
  border-radius: .3rem;
  font-weight: 500;
  letter-spacing: 1px;
  margin-top: 30px;
  border: 1px solid #00493D;
  transition: all .2s;

  &:hover {
    background: transparent;
    color: #00493D;
  }
`

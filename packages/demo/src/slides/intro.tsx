import { Slide } from '@saitonakamura/presa'
import { Title } from '@saitonakamura/presa-blocks'
import styled from 'styled-components'

const DeckTitle = styled(Title)`
  line-height: 0.95;
  margin-top: 90px;
`

const Contacts = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 180px;
  font-weight: bold;
  font-size: 24px;
  align-items: flex-end;
  color: black;
`

const Author = styled.div`
  border-bottom: 2px solid black;
  padding-top: 10px;
`

const TwitterHandle = styled.div`
  font-size: 20px;
`

const Intro = () => {
  return (
    <Slide name="Intro" background={require('../images/gifs/rabbit-run.gif')}>
      <DeckTitle color="black">
        Tips and tricks from school ↝<br />
        Mathematics
      </DeckTitle>

      <Contacts>
        <Author>
          Vova Kulikov
          <br />
          UWDC Chelyabinsk
        </Author>

        <TwitterHandle>@_vovakulikov · wrike.com</TwitterHandle>
      </Contacts>
    </Slide>
  )
}

export default Intro

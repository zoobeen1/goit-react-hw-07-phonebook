import { PhoneBook } from 'components/PhoneBook/PhoneBook';
import { Container } from 'components/common';
import { Contacts } from 'components/Contacts';
import { GlobalStyle } from './GlobalStyle';

export function App() {
  return (
    <Container>
      <PhoneBook />
      <Contacts />
      <GlobalStyle />
    </Container>
  );
}

import { PhoneBook } from 'components/PhoneBook/PhoneBook';
import { Container } from 'components/common';
import { Contacts } from 'components/Contacts';
import { GlobalStyle } from './GlobalStyle';
import { selectIsLoading, selectError } from 'redux/selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';

export function App() {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <Container>
      <PhoneBook />
      {isLoading && !error && <b>Request in progress...</b>}
      {!isLoading && !error && <Contacts />}
      {error && <b>ERROR</b>}
      <GlobalStyle />
    </Container>
  );
}

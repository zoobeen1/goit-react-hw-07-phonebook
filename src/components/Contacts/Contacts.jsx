import React from 'react';
import { Box } from '../common';
import { List, ListItem, Number } from './Contacts.styled';
import { Section } from '../common';
import { Filter } from 'components/Filter';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, selectVisibleContats } from 'redux/selectors';
//Redux-actions
import { deleteContact } from 'redux/operations';
import { setFilter } from 'redux/contactsSlice';

export const Contacts = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  //Возвращает массив контактов по фильтру
  const visibleContacts = useSelector(selectVisibleContats);

  //Управляет фильтром - контроллируемый элемент
  const changeFilter = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <Section title="Contacts">
      <Filter filter={filter} onChange={changeFilter} />
      <Box mt="10px" pt="20px">
        {visibleContacts.map(contact => {
          return (
            <List key={contact.id}>
              <ListItem>
                {`${contact.name}:`}
                <Number> {contact.number} </Number>
                <button onClick={() => dispatch(deleteContact(contact.id))}>
                  Delete
                </button>
              </ListItem>
            </List>
          );
        })}
      </Box>
    </Section>
  );
};

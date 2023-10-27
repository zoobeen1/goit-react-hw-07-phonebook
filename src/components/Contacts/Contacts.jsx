import React from 'react';
import { Box } from '../common';
import { List, ListItem } from './Contacts.styled';
import { Section } from '../common';
import { Filter } from 'components/Filter';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
//Redux-actions
import { deleteContact } from 'redux/contactsSlice';
import { setFilter } from 'redux/filterSlice';

export const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  //Управляет фильтром - контроллируемый элемент
  const changeFilter = e => {
    dispatch(setFilter(e.target.value));
  };
  //Возвращает массив контактов по фильтру
  const getVisibleContacts = () => {
    const lowercaseFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowercaseFilter)
    );
  };

  return (
    <Section title="Contacts">
      <Filter filter={filter} onChange={changeFilter} />
      <Box width="95%" mt="10px" pt="20px">
        {getVisibleContacts().map(contact => {
          return (
            <List key={contact.id}>
              <ListItem>
                {`${contact.name}:`}
                <p> {contact.number} </p>
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

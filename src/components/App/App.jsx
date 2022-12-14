// import { useState, useEffect } from 'react';
// import { nanoid } from 'nanoid';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

import { Container, Title, SecondTitle } from './App.styled';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { addContacts, removeContacts } from 'redux/contacts/contacts-slise';
import { setFilter } from 'redux/filter/filter-slise';

export default function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  // const [contacts, setContacts] = useState(() => {
  //   const value = JSON.parse(localStorage.getItem('contacts'));
  //   return value ?? [];
  // });
  // const [filter, setFilter] = useState('');

  const dispatch = useDispatch();

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const onAddContacts = contact => {
    if (isDuplicate(contact)) {
      return alert(`${contact.name} - is already on the site`);
    }
    const action = addContacts(contact);
    dispatch(action);
    // setContacts(prev => {
    //   const newContact = {
    //     id: nanoid(),
    //     ...contact,
    //   };
    //   return [...prev, newContact];
    // });
  };

  const isDuplicate = ({ name }) => {
    const result = contacts.find(contact => contact.name === name);
    return result;
  };

  const onRemoveContacts = id => {
    const action = removeContacts(id);
    dispatch(action);
    // setContacts(prev => {
    //   const newContacts = prev.filter(contact => contact.id !== id);
    //   return newContacts;
    // });
  };

  const handleChange = evt => {
    const { value } = evt.target;
    // setFilter(value);
    dispatch(setFilter(value));
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const FilteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase();

      return normalizedName.includes(normalizedFilter);
    });

    return FilteredContacts;
  };

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={onAddContacts} />
      <SecondTitle>Contacts</SecondTitle>
      {contacts.length > 0 ? (
        <>
          <Filter filter={filter} handleChange={handleChange} />

          <ContactList
            contacts={getFilteredContacts()}
            removeContacts={onRemoveContacts}
          />
        </>
      ) : (
        <p>Contacts are not find.</p>
      )}
    </Container>
  );
}

import { Formik } from 'formik';
import { Input, FormStyled } from './Form.styled';
import { Button } from 'components/common';
import { FormError } from './FormError';
import * as yup from 'yup';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
//Redux-actions
import { addContact } from 'redux/operations';

export const InputForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  //Formik Validation schema
  const schema = yup.object().shape({
    name: yup.string().min(5).max(40).required('Name is required'),
    number: yup.string().min(5).max(13).required('Phone is required'),
  });
  //Submit function
  const handleSubmit = (values, { resetForm }) => {
    const name = values.name;
    const names = contacts.map(contact => contact.name);

    if (!names.includes(name)) {
      const newContact = {
        // id: nanoid(),
        name,
        number: values.number,
      };

      dispatch(addContact(newContact));
      resetForm();
      return;
    }
    alert(`${name} is already in contacts`);
  };

  const INITIAL_VALUES = { name: '', number: '' };
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <FormStyled>
        <label htmlFor="name">Name</label>
        <Input
          type="text"
          name="name"
          id="name"
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Add a new contact"
          required
        />
        <FormError name="name" />

        <label htmlFor="number">Phone</label>
        <Input
          type="tel"
          name="number"
          id="number"
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="Add a phone number"
          required
        />
        <FormError name="number" />

        <Button type="submit">Add contact</Button>
      </FormStyled>
    </Formik>
  );
};

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectBooking } from '../../redux/campers/selectors';
import { changeBooking } from '../../redux/campers/slice';
import { format } from 'date-fns';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import clsx from 'clsx';
import styles from './BookingForm.module.css';

const BookingForm = ({ camperId }) => {
  const dispatch = useDispatch();
  const booking = useSelector(selectBooking);

  const validationSchema = Yup.object({
    name: Yup.string().required('Please provide your name.'),
    email: Yup.string()
      .email('Please enter a valid email address.')
      .required('Email is mandatory.'),
    date: Yup.date().required('Select a booking date.'),
  });

  const handleSubmit = camperId => async (values, actions) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      actions.resetForm();

      const bookingDate = format(values.date, 'dd/MM/yyyy');

      if (camperId in booking) {
        if (bookingDate in booking[camperId]) {
          if (booking[camperId][bookingDate] === values.email) {
            iziToast.warning({
              title: 'Already Reserved',
              message: `This campervan is already booked for you on ${bookingDate}.`,
              position: 'topRight',
            });
          } else {
            iziToast.error({
              title: 'Unavailable',
              message: `This campervan is booked on ${bookingDate}.`,
              position: 'topRight',
            });
          }
          return;
        }
      }

      dispatch(
        changeBooking({ id: camperId, date: bookingDate, email: values.email }),
      );
      iziToast.success({
        title: 'Booking Confirmed',
        message: 'Your booking was successful.',
        position: 'topRight',
      });
    } catch (error) {
      const errors = error.inner.map(err => err.message);
      iziToast.error({
        title: 'Validation Errors',
        message: errors.join(' '),
        position: 'topRight',
      });
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        date: null,
        comment: '',
      }}
      onSubmit={(values, actions) => handleSubmit(camperId)(values, actions)}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form className={styles.formContainer} noValidate>
          <div className={styles.formInfo}>
            <h3>Book your campervan now</h3>
            <p>Stay connected! We are here to assist you.</p>
          </div>
          <div className={styles.form}>
            <Field
              type="text"
              name="name"
              placeholder="Name*"
              className={styles.field}
            />
            {errors.name && touched.name && (
              <div className={styles.error}>{errors.name}</div>
            )}
            <Field
              type="email"
              name="email"
              placeholder="Email*"
              className={styles.field}
            />
            {errors.email && touched.email && (
              <div className={styles.error}>{errors.email}</div>
            )}
            <DatePicker
              selected={values.date}
              onChange={date => setFieldValue('date', date)}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              className={styles.field}
              placeholderText="Booking date*"
              isClearable
              showPopperArrow={false}
              highlightDates={[
                {
                  'react-datepicker__day--highlighted-custom-1': [new Date()],
                },
              ]}
            />
            {errors.date && touched.date && (
              <div className={styles.error}>{errors.date}</div>
            )}
            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className={clsx(styles.field, styles.stretched)}
            />
          </div>
          <button type="submit">Send</button>
        </Form>
      )}
    </Formik>
  );
};

export default BookingForm;

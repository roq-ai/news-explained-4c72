import * as yup from 'yup';

export const subscriberContentValidationSchema = yup.object().shape({
  subscriber_id: yup.string().nullable(),
  content_id: yup.string().nullable(),
});

import * as yup from 'yup';

export const contentValidationSchema = yup.object().shape({
  title: yup.string().required(),
  explanation: yup.string().required(),
  creator_id: yup.string().nullable(),
});

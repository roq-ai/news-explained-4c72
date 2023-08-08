import * as yup from 'yup';

export const editorReviewValidationSchema = yup.object().shape({
  status: yup.string().required(),
  content_id: yup.string().nullable(),
  editor_id: yup.string().nullable(),
});

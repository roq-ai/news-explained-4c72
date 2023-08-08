import axios from 'axios';
import queryString from 'query-string';
import { EditorReviewInterface, EditorReviewGetQueryInterface } from 'interfaces/editor-review';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getEditorReviews = async (
  query?: EditorReviewGetQueryInterface,
): Promise<PaginatedInterface<EditorReviewInterface>> => {
  const response = await axios.get('/api/editor-reviews', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createEditorReview = async (editorReview: EditorReviewInterface) => {
  const response = await axios.post('/api/editor-reviews', editorReview);
  return response.data;
};

export const updateEditorReviewById = async (id: string, editorReview: EditorReviewInterface) => {
  const response = await axios.put(`/api/editor-reviews/${id}`, editorReview);
  return response.data;
};

export const getEditorReviewById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/editor-reviews/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEditorReviewById = async (id: string) => {
  const response = await axios.delete(`/api/editor-reviews/${id}`);
  return response.data;
};

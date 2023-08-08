import axios from 'axios';
import queryString from 'query-string';
import { SubscriberContentInterface, SubscriberContentGetQueryInterface } from 'interfaces/subscriber-content';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSubscriberContents = async (
  query?: SubscriberContentGetQueryInterface,
): Promise<PaginatedInterface<SubscriberContentInterface>> => {
  const response = await axios.get('/api/subscriber-contents', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSubscriberContent = async (subscriberContent: SubscriberContentInterface) => {
  const response = await axios.post('/api/subscriber-contents', subscriberContent);
  return response.data;
};

export const updateSubscriberContentById = async (id: string, subscriberContent: SubscriberContentInterface) => {
  const response = await axios.put(`/api/subscriber-contents/${id}`, subscriberContent);
  return response.data;
};

export const getSubscriberContentById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/subscriber-contents/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSubscriberContentById = async (id: string) => {
  const response = await axios.delete(`/api/subscriber-contents/${id}`);
  return response.data;
};

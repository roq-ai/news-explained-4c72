import { UserInterface } from 'interfaces/user';
import { ContentInterface } from 'interfaces/content';
import { GetQueryInterface } from 'interfaces';

export interface SubscriberContentInterface {
  id?: string;
  subscriber_id?: string;
  content_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  content?: ContentInterface;
  _count?: {};
}

export interface SubscriberContentGetQueryInterface extends GetQueryInterface {
  id?: string;
  subscriber_id?: string;
  content_id?: string;
}

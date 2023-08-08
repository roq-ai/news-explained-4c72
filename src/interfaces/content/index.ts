import { EditorReviewInterface } from 'interfaces/editor-review';
import { SubscriberContentInterface } from 'interfaces/subscriber-content';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ContentInterface {
  id?: string;
  title: string;
  explanation: string;
  creator_id?: string;
  created_at?: any;
  updated_at?: any;
  editor_review?: EditorReviewInterface[];
  subscriber_content?: SubscriberContentInterface[];
  user?: UserInterface;
  _count?: {
    editor_review?: number;
    subscriber_content?: number;
  };
}

export interface ContentGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  explanation?: string;
  creator_id?: string;
}

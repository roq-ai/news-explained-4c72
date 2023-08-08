import { ContentInterface } from 'interfaces/content';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface EditorReviewInterface {
  id?: string;
  content_id?: string;
  editor_id?: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  content?: ContentInterface;
  user?: UserInterface;
  _count?: {};
}

export interface EditorReviewGetQueryInterface extends GetQueryInterface {
  id?: string;
  content_id?: string;
  editor_id?: string;
  status?: string;
}

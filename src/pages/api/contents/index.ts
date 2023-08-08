import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { contentValidationSchema } from 'validationSchema/contents';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getContents();
    case 'POST':
      return createContent();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getContents() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.content
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'content'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createContent() {
    await contentValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.editor_review?.length > 0) {
      const create_editor_review = body.editor_review;
      body.editor_review = {
        create: create_editor_review,
      };
    } else {
      delete body.editor_review;
    }
    if (body?.subscriber_content?.length > 0) {
      const create_subscriber_content = body.subscriber_content;
      body.subscriber_content = {
        create: create_subscriber_content,
      };
    } else {
      delete body.subscriber_content;
    }
    const data = await prisma.content.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}

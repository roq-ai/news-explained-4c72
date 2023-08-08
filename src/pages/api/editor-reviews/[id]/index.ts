import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { editorReviewValidationSchema } from 'validationSchema/editor-reviews';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.editor_review
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEditorReviewById();
    case 'PUT':
      return updateEditorReviewById();
    case 'DELETE':
      return deleteEditorReviewById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEditorReviewById() {
    const data = await prisma.editor_review.findFirst(convertQueryToPrismaUtil(req.query, 'editor_review'));
    return res.status(200).json(data);
  }

  async function updateEditorReviewById() {
    await editorReviewValidationSchema.validate(req.body);
    const data = await prisma.editor_review.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteEditorReviewById() {
    const data = await prisma.editor_review.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

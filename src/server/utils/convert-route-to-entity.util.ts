const mapping: Record<string, string> = {
  contents: 'content',
  'editor-reviews': 'editor_review',
  organizations: 'organization',
  'subscriber-contents': 'subscriber_content',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

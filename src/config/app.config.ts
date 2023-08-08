interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Administrator'],
  customerRoles: ['Subscriber'],
  tenantRoles: ['Administrator', 'Content Creator', 'Editor'],
  tenantName: 'Organization',
  applicationName: 'News Explained',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};

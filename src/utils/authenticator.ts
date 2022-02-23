export const tokenAuthenticator = (request: any) => {
  if (!request.user) {
    console.log('add error');
  }
};

export const apiClientFetch = async (path: string, body?: any): Promise<any> => {
  const res = await fetch('/api/user?path=' + path, {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify(body)
  });
  return await res.json();
};

export const apiServerFetch = async (url: string, method: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE', body?: any, accessToken?: string): Promise<any> => {
  let headers: any = {
    'Content-type': 'application/json'
  };
  let newBody: any = {};
  if (accessToken) {
    headers = { ...headers, Authorization: `Bearer ${accessToken}` };
  }
  if (body) {
    newBody = { body: JSON.stringify(body) };
  }
  const res = await fetch('https://gcj2.azurewebsites.net' + url, {
    method,
    headers,
    cache: 'no-store',
    ...newBody
  });
  if (!(res.status === 200 || res.status === 400)) {
    throw new Error('Backend error');
  }
  return await res.json();
};

export const errorSystem = (error: string, data: any) => {
  return {
    status: 'error',
    responseText: error,
    data
  };
};

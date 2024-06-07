import { UserLogin, UserLoginResponse } from 'package/api/user/login';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { errorSystem } from 'package/api/api-fetch';
import { getUserToken, setUserToken } from 'package/cookies/token';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);

  const params = await req.json();
  const customerToken = await getUserToken(cookies());
  console.log(customerToken)
  const path = searchParams.get('path') as string;
  const data = await response(params, customerToken, path);
  return NextResponse.json(data);
}

const response = async (params: any, customerToken: string, path: string) => {
  try {
    let res: any = {};
    switch (path) {
      case 'login':
        res = await UserLogin({ email: params.email, password: params.password });
        if (res.data.roleId && res.data.roleId === 4) {
          setUserToken(res.data.token, cookies());
        } else {
          throw new Error('Sai tài khoản hoặc mật khẩu');
        }
        break;
      case 'customer-token':
        res = {
          token: customerToken
        };
        break;
      case 'logout':
        setUserToken('', cookies());
        res = {
          responseText: 'Đăng xuất thành công',
          status: 'success'
        };
        break;
      default:
        res = {};
    }
    return res;
  } catch (error: any) {
    return errorSystem(error.message, {});
  }
};

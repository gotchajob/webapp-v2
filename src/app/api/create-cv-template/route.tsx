import { CVTemplateData } from 'components/cv-component/interface';
import { NextRequest, NextResponse } from 'next/server';
import { PostCVTemplate } from 'package/api/cv-template';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const res = await PostCVTemplate({ cvCategoryId: 3, image: "https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/basic_5_v2.png?v=1.0.6", name: "Mẫu 2", templateJson: JSON.stringify(CVTemplateData) });

  return NextResponse.json(res);
}

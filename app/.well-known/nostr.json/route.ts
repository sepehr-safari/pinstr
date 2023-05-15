import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  const db = {
    names: {
      sepehr:
        '3e294d2fd339bb16a5403a86e3664947dd408c4d87a0066524f8a573ae53ca8e',
    },
  };

  if (!name || !db.names[name]) {
    return NextResponse.json({});
  }

  return NextResponse.json(
    {
      names: {
        [name]: db.names[name],
      },
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

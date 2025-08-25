import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);

    const eventType = body.type;
    const data = body.data;

    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { id, first_name, email_addresses, image_url } = data;
      const email = email_addresses?.[0]?.email_address;
      const name = first_name;
      const imageUrl = image_url;

      if (!id || !email) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }

      await prisma.user.upsert({
        where: { id },
        update: { name, email, imageUrl },
        create: { id, name, email, imageUrl },
      });

      return NextResponse.json({ message: 'User synced successfully' }, { status: 200 });
    }

    if (eventType === 'user.deleted') {
      const userId = data?.id;
      if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
      }

      await prisma.user.delete({
        where: { id: userId },
      });

      return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Unhandled event type' }, { status: 400 });
  } catch (error) {
    console.error('[WEBHOOK_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


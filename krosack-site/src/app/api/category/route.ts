import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

// POST: Add a new category
export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Category name is required.' }, { status: 400 });
    }

    const existing = await prisma.category.findUnique({ where: { name } });
    if (existing) {
      return NextResponse.json({ error: 'Category already exists.' }, { status: 409 });
    }

    const newCategory = await prisma.category.create({
      data: { name },
    });

    return NextResponse.json({ success: true, category: newCategory }, { status: 201 });
  } catch (error) {
    console.error('[CREATE CATEGORY ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET: Fetch all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ success: true, categories }, { status: 200 });
  } catch (error) {
    console.error('[GET CATEGORIES ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single product by ID
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      // include: { category: true },
      select: {
        id: true,
        name: true,
        description: true,
        highlight: true,
        features: true,
        stock: true,
        brand: true,
        color: true,
        highDemand: true,
        category: true,
        technical: true,
        imageUrl: true,
        price: true,
      }, 
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    console.error("[GET SINGLE PRODUCT ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE a product
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Product deleted' }, { status: 200 })
  } catch (error) {
    console.error('[DELETE PRODUCT ERROR]', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

// UPDATE a product
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const body = await req.json();
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        brand: body.brand,
        color: body.color,
        highDemand: body.highDemand,
        highlight: body.highlight,
        features: body.features,
        technical: body.technical,
        stock: body.stock,
        imageUrl: body.imageUrl,
        price: body.price,
      },
    })

    return NextResponse.json({ success: true, product: updatedProduct }, { status: 200 })
  } catch (error) {
    console.error('[PUT PRODUCT ERROR]', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

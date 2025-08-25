import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' 
import cloudinary from '@/lib/cloudinary'

// Add a product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const uploadedImages: string[] = [];
    if (body.imageUrl && body.imageUrl.length > 0) {
      for (const file of body.imageUrl) {
        const uploadResponse = await cloudinary.uploader.upload(file, {
          folder: "products",
        });
        uploadedImages.push(uploadResponse.secure_url);
      }
    }

    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        category: {
          connect: { id: body.category },
        },
        brand: body.brand,
        color: body.color,
        highDemand: body.highDemand,
        highlight: body.highlight,
        features: body.features,
        technical: body.technical,
        stock: body.stock,
        imageUrl: uploadedImages,
      },
    })

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 })
  } catch (error) {
    console.error('[POST PRODUCT ERROR]', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
// GET all products
export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true, 
      },
    });

    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.error('[GET PRODUCTS ERROR]', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}


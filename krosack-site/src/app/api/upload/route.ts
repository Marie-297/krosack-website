import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "@/lib/cloudinary";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { file } = req.body; 
      if (!file) {
        return res.status(400).json({ error: "No file provided" });
      }

      const uploadResponse = await cloudinary.uploader.upload(file, {
        folder: "products", 
      });

      return res.status(200).json({ url: uploadResponse.secure_url });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

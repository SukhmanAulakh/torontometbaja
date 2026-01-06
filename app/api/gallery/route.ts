import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = "AIzaSyC8Pa3VIND-M1hZ0A2IuXSjtFSiR_KHb5g";
  const FOLDER_ID = "1dIWdibCp8ulxcnxOs9CShchW0_WxtfSP";

  // URL to list files in the specific folder
  // We request 'files(id, name, thumbnailLink)'
  // We will transform thumbnailLink to get a higher quality image
  const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}' in parents and trashed=false and (mimeType='image/png' or mimeType='image/jpeg' or mimeType='image/jpg')&key=${API_KEY}&fields=files(id,name,thumbnailLink)`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google Drive API error: ${response.statusText}`);
    }
    const data = await response.json();
    const files = data.files || [];

    // Map to our gallery format
    const images = files.map((file: any) => {
      // TRICK: Google Drive thumbnailLinks usually end with '=s220' (size 220). 
      // We can strip this or change it to '=s1000' or similar to get a high-res version.
      // Stripping it usually gives the original size (or a very large preview).
      let src = file.thumbnailLink;
      if (src && src.includes('=')) {
        src = src.split('=')[0];
      }

      return {
        id: file.id,
        src: src,
        alt: file.name,
        caption: "" // No specific caption in Drive metadata usually, leaving blank or name
      };
    });

    return NextResponse.json(images);

  } catch (error) {
    console.error("Error fetching from Google Drive:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

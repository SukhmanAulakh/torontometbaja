import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageToken = searchParams.get('nextPageToken') || "";
  const PAGE_SIZE = 10;

  const API_KEY = "AIzaSyC8Pa3VIND-M1hZ0A2IuXSjtFSiR_KHb5g";
  const FOLDER_ID = "1dIWdibCp8ulxcnxOs9CShchW0_WxtfSP";

  // URL to list files in the specific folder
  // Query changed to "mimeType contains 'image/'" to include HEIC, WebP, etc.
  // Added orderBy to ensure consistent ordering (Newest first)
  let url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}' in parents and trashed=false and mimeType contains 'image/'&key=${API_KEY}&fields=nextPageToken,files(id,name,thumbnailLink)&pageSize=${PAGE_SIZE}&orderBy=createdTime desc`;

  if (pageToken) {
    url += `&pageToken=${pageToken}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google Drive API error: ${response.statusText}`);
    }
    const data = await response.json();
    const files = data.files || [];
    const nextPageToken = data.nextPageToken || null;

    // Map to our gallery format
    const images = files.map((file: any) => {
      let src = file.thumbnailLink;
      // TRICK: Instead of using the original file (which might be HEIC), we request a huge thumbnail.
      // Google Drive generates JPEG thumbnails for HEIC files.
      // replacing with '=s2048' ensures high quality and format compatibility.
      if (src && src.includes('=')) {
        src = src.replace(/=s\d+$/, '=s2048');
      }

      return {
        id: file.id,
        src: src,
        alt: file.name,
        caption: ""
      };
    });

    return NextResponse.json({ images, nextPageToken });

  } catch (error) {
    console.error("Error fetching from Google Drive:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

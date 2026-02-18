import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageToken = searchParams.get('nextPageToken') || "";
  const PAGE_SIZE = 25;

  const API_KEY = process.env.GOOGLE_DRIVE_API_KEY;
  const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!API_KEY || !FOLDER_ID) {
    console.error("Missing required environment variables: GOOGLE_DRIVE_API_KEY or GOOGLE_DRIVE_FOLDER_ID");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  // URL to list files in the specific folder
  // Query changed to include images and videos
  // Added orderBy to ensure consistent ordering (Newest first)
  let url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}' in parents and trashed=false and (mimeType contains 'image/' or mimeType contains 'video/')&key=${API_KEY}&fields=nextPageToken,files(id,name,thumbnailLink,mimeType,webViewLink)&pageSize=${PAGE_SIZE}&orderBy=createdTime desc`;

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

      // Only apply high-res hack to images. 
      // For videos, the default thumbnail link is safer to avoid breakage/compression issues.
      if (src && src.includes('=') && file.mimeType && file.mimeType.includes('image/')) {
        src = src.replace(/=s\d+$/, '=s2048');
      } else if (src && src.includes('=') && file.mimeType && file.mimeType.includes('video/')) {
        // For videos, we might want a slightly larger thumbnail than default but not too huge to break it
        // Often removing the size param gives the default size which is decent, or we can try s800
        // standard drive thumbnails for videos can sometimes be tricky with size params.
        // Let's try s1024 for videos if possible, or just remove the param to let drive decide.
        // Ideally, try to get a decent size.
        src = src.replace(/=s\d+$/, '=s800');
      }

      return {
        id: file.id,
        src: src,
        alt: file.name,
        caption: "",
        mimeType: file.mimeType,
        webViewLink: file.webViewLink
      };
    });

    return NextResponse.json({ images, nextPageToken });

  } catch (error) {
    console.error("Error fetching from Google Drive:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

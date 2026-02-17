import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { folderId: string } }
) {
    const { searchParams } = new URL(request.url);
    const pageToken = searchParams.get('nextPageToken') || "";
    const PAGE_SIZE = 20;

    const API_KEY = "AIzaSyC8Pa3VIND-M1hZ0A2IuXSjtFSiR_KHb5g";
    const folderId = params.folderId;

    // URL to list files in the specific folder
    let url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and trashed=false and mimeType contains 'image/'&key=${API_KEY}&fields=nextPageToken,files(id,name,thumbnailLink)&pageSize=${PAGE_SIZE}&orderBy=createdTime desc`;

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
            // Request high-quality thumbnail
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
        console.error("Error fetching images from folder:", error);
        return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
    }
}

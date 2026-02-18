import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    props: { params: Promise<{ folderId: string }> }
) {
    const params = await props.params;
    const { searchParams } = new URL(request.url);
    const pageToken = searchParams.get('nextPageToken') || "";
    const PAGE_SIZE = 25;

    const API_KEY = process.env.GOOGLE_DRIVE_API_KEY;
    const folderId = params.folderId;

    if (!API_KEY) {
        console.error("Missing required environment variable: GOOGLE_DRIVE_API_KEY");
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // URL to list files in the specific folder
    const fields = "nextPageToken,files(id,name,thumbnailLink,mimeType,webViewLink,imageMediaMetadata(width,height),videoMediaMetadata(width,height))";
    let url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and trashed=false and (mimeType contains 'image/' or mimeType contains 'video/')&key=${API_KEY}&fields=${fields}&pageSize=${PAGE_SIZE}&orderBy=createdTime desc`;

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
            if (src && src.includes('=') && file.mimeType && file.mimeType.includes('image/')) {
                src = src.replace(/=s\d+$/, '=s2048');
            } else if (src && src.includes('=') && file.mimeType && file.mimeType.includes('video/')) {
                src = src.replace(/=s\d+$/, '=s800');
            }

            return {
                id: file.id,
                src: src,
                alt: file.name,
                caption: "",
                mimeType: file.mimeType,
                webViewLink: file.webViewLink,
                width: Number(file.imageMediaMetadata?.width || file.videoMediaMetadata?.width) || null,
                height: Number(file.imageMediaMetadata?.height || file.videoMediaMetadata?.height) || null
            };
        });

        return NextResponse.json({ images, nextPageToken });

    } catch (error) {
        console.error("Error fetching images from folder:", error);
        return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';

export async function GET() {
    const API_KEY = process.env.GOOGLE_DRIVE_API_KEY;
    const PARENT_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!API_KEY || !PARENT_FOLDER_ID) {
        console.error("Missing required environment variables: GOOGLE_DRIVE_API_KEY or GOOGLE_DRIVE_FOLDER_ID");
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // 1. First, find the "Competitions" subfolder within the parent folder
    const competitionsUrl = `https://www.googleapis.com/drive/v3/files?q='${PARENT_FOLDER_ID}' in parents and name='Competitions' and mimeType='application/vnd.google-apps.folder' and trashed=false&key=${API_KEY}&fields=files(id,name)`;

    try {
        const compResponse = await fetch(competitionsUrl);
        const compData = await compResponse.json();
        const competitionsFolder = compData.files?.[0];

        if (!competitionsFolder) {
            console.log("No 'Competitions' folder found, returning empty list");
            return NextResponse.json({ folders: [] });
        }

        const TARGET_FOLDER_ID = competitionsFolder.id;

        // 2. Query to get all folders within the Competitions folder
        const url = `https://www.googleapis.com/drive/v3/files?q='${TARGET_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false&key=${API_KEY}&fields=files(id,name)&orderBy=name`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Google Drive API error: ${response.statusText}`);
        }
        const data = await response.json();
        const folders = data.files || [];

        // Fetch counts for each folder
        const foldersWithCounts = await Promise.all(folders.map(async (folder: any) => {
            try {
                // Query to count files (images and videos) in this folder
                // We use pageSize=1000 to get a reasonable count.
                // Added thumbnailLink and mimeType to fields to get a cover image.
                // Added orderBy createdTime desc to get the latest image as cover.
                const countUrl = `https://www.googleapis.com/drive/v3/files?q='${folder.id}' in parents and trashed=false and (mimeType contains 'image/' or mimeType contains 'video/')&key=${API_KEY}&fields=files(id,thumbnailLink,mimeType)&pageSize=1000&orderBy=createdTime desc`;

                const countRes = await fetch(countUrl);
                if (countRes.ok) {
                    const countData = await countRes.json();
                    const files = countData.files || [];
                    const count = files.length;

                    // Find the first valid thumbnail to use as cover
                    let coverImage = null;
                    if (files.length > 0) {
                        const firstFile = files[0];
                        let src = firstFile.thumbnailLink;
                        if (src && src.includes('=') && firstFile.mimeType) {
                            if (firstFile.mimeType.includes('image/')) {
                                src = src.replace(/=s\d+$/, '=s256'); // Smaller thumbnail for cover
                            } else if (firstFile.mimeType.includes('video/')) {
                                src = src.replace(/=s\d+$/, '=s256');
                            }
                            coverImage = src;
                        }
                    }

                    return { ...folder, count, coverImage };
                }
                return { ...folder, count: 0, coverImage: null };
            } catch (e) {
                console.error(`Failed to count files for folder ${folder.id}`, e);
                return { ...folder, count: 0, coverImage: null };
            }
        }));

        return NextResponse.json({ folders: foldersWithCounts });

    } catch (error) {
        console.error("Error fetching folders from Google Drive:", error);
        return NextResponse.json({ error: "Failed to fetch folders" }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';

export async function GET() {
    const API_KEY = "AIzaSyC8Pa3VIND-M1hZ0A2IuXSjtFSiR_KHb5g";
    const PARENT_FOLDER_ID = "1dIWdibCp8ulxcnxOs9CShchW0_WxtfSP";

    // Query to get all folders within the parent folder
    const url = `https://www.googleapis.com/drive/v3/files?q='${PARENT_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false&key=${API_KEY}&fields=files(id,name)&orderBy=name`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Google Drive API error: ${response.statusText}`);
        }
        const data = await response.json();
        const folders = data.files || [];

        return NextResponse.json({ folders });

    } catch (error) {
        console.error("Error fetching folders from Google Drive:", error);
        return NextResponse.json({ error: "Failed to fetch folders" }, { status: 500 });
    }
}

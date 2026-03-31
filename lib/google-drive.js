/**
 * Client-side Google Drive API utilities.
 *
 * These functions call the public Google Drive v3 REST API directly from the
 * browser using an API key baked in at build time via NEXT_PUBLIC_ env vars.
 *
 * The API key should be restricted in the Google Cloud Console to:
 *   - HTTP referrers matching your production domain
 *   - Only the Drive API
 */

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
const FOLDER_ID = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID;
const PAGE_SIZE = 25;

/**
 * Fetch images/videos from the root gallery folder.
 */
export async function fetchGalleryImages(pageToken = "") {
  const fields =
    "nextPageToken,files(id,name,thumbnailLink,mimeType,webViewLink,imageMediaMetadata(width,height),videoMediaMetadata(width,height))";

  let url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+trashed=false+and+(mimeType+contains+'image/'+or+mimeType+contains+'video/')&key=${API_KEY}&fields=${encodeURIComponent(fields)}&pageSize=${PAGE_SIZE}&orderBy=createdTime+desc`;

  if (pageToken) {
    url += `&pageToken=${pageToken}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Google Drive API error: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    images: mapFiles(data.files || []),
    nextPageToken: data.nextPageToken || null,
  };
}

/**
 * Fetch competition/event sub-folders from the root folder.
 */
export async function fetchGalleryFolders() {
  // 1. Find the "Competitions" subfolder within the parent folder
  const competitionsUrl = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+name='Competitions'+and+mimeType='application/vnd.google-apps.folder'+and+trashed=false&key=${API_KEY}&fields=files(id,name)`;

  const compResponse = await fetch(competitionsUrl);
  const compData = await compResponse.json();
  const competitionsFolder = compData.files?.[0];

  if (!competitionsFolder) {
    return { folders: [] };
  }

  // 2. Get all folders within the Competitions folder
  const url = `https://www.googleapis.com/drive/v3/files?q='${competitionsFolder.id}'+in+parents+and+mimeType='application/vnd.google-apps.folder'+and+trashed=false&key=${API_KEY}&fields=files(id,name)&orderBy=name`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Google Drive API error: ${response.statusText}`);
  }
  const data = await response.json();
  const folders = data.files || [];

  // Fetch counts and cover images for each folder
  const foldersWithCounts = await Promise.all(
    folders.map(async (folder) => {
      try {
        const countUrl = `https://www.googleapis.com/drive/v3/files?q='${folder.id}'+in+parents+and+trashed=false+and+(mimeType+contains+'image/'+or+mimeType+contains+'video/')&key=${API_KEY}&fields=files(id,thumbnailLink,mimeType)&pageSize=1000&orderBy=createdTime+desc`;

        const countRes = await fetch(countUrl);
        if (countRes.ok) {
          const countData = await countRes.json();
          const files = countData.files || [];
          const count = files.length;

          let coverImage = null;
          if (files.length > 0) {
            const firstFile = files[0];
            let src = firstFile.thumbnailLink;
            if (src && src.includes("=") && firstFile.mimeType) {
              src = src.replace(/=s\d+$/, "=s256");
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
    })
  );

  return { folders: foldersWithCounts };
}

/**
 * Fetch images/videos from a specific event folder.
 */
export async function fetchFolderImages(folderId, pageToken = "") {
  const fields =
    "nextPageToken,files(id,name,thumbnailLink,mimeType,webViewLink,imageMediaMetadata(width,height),videoMediaMetadata(width,height))";

  let url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false+and+(mimeType+contains+'image/'+or+mimeType+contains+'video/')&key=${API_KEY}&fields=${encodeURIComponent(fields)}&pageSize=${PAGE_SIZE}&orderBy=createdTime+desc`;

  if (pageToken) {
    url += `&pageToken=${pageToken}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Google Drive API error: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    images: mapFiles(data.files || []),
    nextPageToken: data.nextPageToken || null,
  };
}

/**
 * Map raw Drive API file objects to the gallery image format.
 */
function mapFiles(files) {
  return files.map((file) => {
    let src = file.thumbnailLink;

    if (
      src &&
      src.includes("=") &&
      file.mimeType &&
      file.mimeType.includes("image/")
    ) {
      src = src.replace(/=s\d+$/, "=s2048");
    } else if (
      src &&
      src.includes("=") &&
      file.mimeType &&
      file.mimeType.includes("video/")
    ) {
      src = src.replace(/=s\d+$/, "=s800");
    }

    return {
      id: file.id,
      src: src,
      alt: file.name,
      caption: "",
      mimeType: file.mimeType,
      webViewLink: file.webViewLink,
      width:
        Number(
          file.imageMediaMetadata?.width || file.videoMediaMetadata?.width
        ) || null,
      height:
        Number(
          file.imageMediaMetadata?.height || file.videoMediaMetadata?.height
        ) || null,
    };
  });
}

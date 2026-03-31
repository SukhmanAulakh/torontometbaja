# Media Team: Guide to Updating Website Data

This guide explains how to update the content of the TMU Baja website by modifying the `config/data.ts` file. This file acts as the "source of truth" for team members, sponsors, and subteam details.

## 📍 File Location
The file is located at: `torontometbaja/config/data.ts`

---

## 👥 Updating Team Members

The `teamMembers` array contains objects for each lead.

### 1. Adding a New Member
To add a member, follow this structure:

```typescript
{
  name: "Full Name",
  role: "Their Official Role",
  bio: "A short one-sentence description.",
  imageUrl: imageNameImg.src, // See 'Handling Images' below
  linkedin: "https://linkedin.com/in/username", 
}
```

### 2. Handling Headshot Images
Before adding a member, you must import their image at the **top of the file**:

1.  Place the image in `resources/headshots/`.
2.  Add an import line at the top:
    ```typescript
    import myNameImg from "../resources/headshots/my-photo.png";
    ```
3.  Use `myNameImg.src` in the `imageUrl` field.

> [!IMPORTANT]
> Keep filenames simple (lowercase, no spaces) and ensure they are high-quality square crops if possible.

---

## 🤝 Updating Sponsors

Sponsors are grouped into **Platinum, Gold, Silver, and Bronze**.

### 1. Adding a Sponsor
Find the `sponsors` array and add a new entry:

```typescript
{
  name: "Company Name",
  tier: "Platinum", // Must be "Platinum", "Gold", "Silver", or "Bronze"
  logoUrl: companyLogoImg.src,
  website: "https://company-link.com",
}
```

### 2. Handling Logos
1.  Place the logo (preferably SVG or transparent PNG) in `resources/sponsors/`.
2.  Import it at the top of the file:
    ```typescript
    import companyLogoImg from "../resources/sponsors/company-logo.svg";
    ```

---

## ⚙️ Best Practices & Gotchas

### ✅ Syntax Check
*   Ensure every item in a list has a **comma** at the end.
*   Make sure you don't accidentally delete opening or closing brackets: `[ ]` or `{ }`.

### 🖼️ Image Formats
*   **Logos**: Use `.svg` or `.webp` for the best quality and performance.
*   **Photos**: Use `.jpg` or `.png`.

### 🚀 Verifying Changes
If you have the project running locally (`npm run dev`):
1.  Save the file.
2.  Check the website in your browser immediately; it will "hot-reload" to show your changes.
3.  **If the site crashes (shows a red error screen)**: You likely have a typo (like a missing comma). Undo your last change and try again.

---

## 📝 Current Tiers & Roles Reference
*   **Roles**: Capitalize properly (e.g., "Chassis Lead", not "chassis lead").
*   **Sponsorship Tiers**: Must match exactly: `"Platinum"`, `"Gold"`, `"Silver"`, `"Bronze"`.

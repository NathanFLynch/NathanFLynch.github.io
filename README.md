# CAD Portfolio Site

A simple portfolio for your Siemens NX work. No build tools, no installs. Everything you edit lives in **one file**: `js/projects.js`.

- **Home page** (`index.html`): two columns of model pictures. Clicking a picture or a name opens that project.
- **Project page** (`project.html`): hero image, facts, write-up, renders, drawings, videos/turntables, photos. Click any image to enlarge it.
- **Printing**: the project page has a "Print this page" button and a print layout built in.

## 1. Preview it on your computer

Double-click `index.html`. It opens in your browser, no server needed.

## 2. Put it online with GitHub Pages (free)

1. Create a GitHub account and make a new **public** repository (for example `portfolio`).
2. Click **Add file > Upload files**, drag in everything from this folder (`index.html`, `project.html`, and the `css`, `js`, `projects` folders), then click **Commit changes**.
3. Go to **Settings > Pages**. Under "Build and deployment", choose **Deploy from a branch**, pick `main` and `/ (root)`, and click **Save**.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/portfolio/`. That is the link to put on your resume and send to recruiters.

To make the link `yourname.github.io` with no repository name, name the repository exactly `YOUR-USERNAME.github.io`.

## 3. Add your name and links

Open `js/projects.js` and edit the `SITE` block at the top: name, headline, intro, and links.

## 4. Add a new project (3 steps)

1. **Make a folder** inside `projects/` named after the project, lowercase with dashes, for example `projects/shaft-coupling`.
2. **Drop your images in that folder** (JPG or PNG, about 1600 px wide).
3. **Copy an existing block** in `js/projects.js`, paste it at the end of the `PROJECTS` list, and change the text and file names. The `id` must match the folder name.

Minimal block:

```js
{
  id: "shaft-coupling",
  title: "Shaft Coupling",
  summary: "One line that shows under the picture on the home page.",
  thumbnail: "thumb.jpg",
  renders: ["render-1.jpg", "render-2.jpg"],
},
```

Everything else is optional. Leave out any section you do not have and it simply will not show.

| Field | What it does |
|---|---|
| `thumbnail` | Picture on the home page. |
| `hero` | Big picture at the top of the project page. Defaults to the thumbnail. |
| `facts` | Label and value pairs (Year, Role, Material, anything). |
| `sections` | Short write-ups with a heading and text. |
| `renders`, `photos` | Lists of images. |
| `drawings` | Images or PDFs. A PDF shows as an "Open PDF" link. |
| `videos` | Local `.mp4`/`.webm`, a YouTube or Vimeo link, or a Sketchfab embed link. |

Add a caption to any image by writing it as `{ file: "render-1.jpg", caption: "Section view" }`.

To **reorder** projects, move their blocks up or down in the list. To **remove** one, delete its block.

You can edit directly on GitHub: open `js/projects.js`, click the pencil icon, change it, and commit. Upload new images with **Add file > Upload files** inside the project's folder.

## 5. Exporting from NX

- **Renders**: use Advanced Studio or Visualize, then export as PNG or JPG. Use the same background and camera angle style across projects so the home page looks consistent.
- **Thumbnails**: the home page crops pictures to a 4:3 box, so keep the model centered with some margin around it.
- **Drawings**: export the drafting sheet to PDF, or to PNG for an image. Include one or two per project.
- **Turntables**: record a rotating view and save as `.mp4`. Keep videos under about 25 MB (GitHub limits files to 100 MB). For anything bigger, upload to YouTube and paste the link.
- **Interactive 3D**: upload the model to Sketchfab and use its embed link in `videos`.
- **File size**: shrink photos before uploading (JPG at around 300 KB to 1 MB each) so the site loads quickly on a phone.

## 6. Printing for interviews

Open a project page and click **Print this page** (or press Ctrl/Cmd + P). The menus and buttons are hidden, images are sized to fit, and the page address is printed at the bottom so people can find the online version. Videos are replaced by a note pointing to the website.

Tips: in the print dialog turn on **Background graphics**, and if a page spills onto a second sheet, lower the **Scale** to about 85%. Choose **Save as PDF** to make a file you can email.

## 7. Change the look

Colors and fonts are at the top of `css/style.css` under `:root`.

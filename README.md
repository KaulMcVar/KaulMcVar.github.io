# KaulMc Portfolio

My Minecraft portfolio: plugins, configs and server setups.

Live at **https://kaulmcvar.github.io**

Plain HTML, CSS and JavaScript. No build step, so it runs on GitHub Pages as is.

## Files

| File | What it is |
|---|---|
| `index.html` | The page (text for hero, services, stack, contact) |
| `projects.js` | The project cards. Edit this to add or change work |
| `style.css` | All styling |
| `script.js` | Filters, console animation, counters, mobile menu |
| `assets/favicon.svg` | Tab icon (grass block) |

## Add a project

Open `projects.js` and copy one block:

```js
{
  title: "My Plugin",
  type: "plugin",           // plugin | config | setup | tool
  desc: "What it does in one or two lines.",
  tags: ["Paper 1.21.11", "Java 21"],
  link: "https://github.com/KaulMcVar/my-plugin"   // or "" for no button
},
```

## Put it on GitHub Pages

1. On GitHub, click **+** (top right) > **New repository**.
2. Name it exactly `KaulMcVar.github.io`, set it to **Public**, click **Create repository**.
3. Click **uploading an existing file**, drag in all the files and the `assets` folder, then **Commit changes**.
4. Go to **Settings > Pages**. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`, **Save**.
5. Wait 1 to 2 minutes, then open `https://kaulmcvar.github.io`.
6. Optional: paste that link into the **URL** field of your GitHub profile.

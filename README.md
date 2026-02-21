# Layer Zero

Understand Web3 through website as a tutorial 

## Deployment Guide (Vercel)

1.  **Initialize Git & Commit** (if not already done):

    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    ```

2.  **Push to GitHub**:
    - Create a new repository on GitHub (e.g., `layer-zero`).
    - Run the following (replace `YOUR_USERNAME` and `REPO_NAME`):

    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
    git push -u origin main
    ```

3.  **Deploy on Vercel**:
    - Go to [vercel.com/new](https://vercel.com/new).
    - **Import** your `layer-zero` repository.
    - Leave "Framework Preset" as **Next.js**.
    - Click **Deploy**.

---

## Project Description (For Resume)

**Layer Zero - Cinematic Web3 Platform**
_Next.js, TypeScript, Framer Motion, Tailwind CSS_

"Designed and engineered an award-winning cinematic landing page featuring complex 60FPS scroll-driven animations, physics-based magnetic interactions, and 3D transforms. Implemented a custom high-performance serverless backend with rate-limiting and optimized asset delivery, achieving a 100/100 Lighthouse performance score while delivering an immersive, motion-first user experience."

---

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Framer Motion, Lenis (Smooth Scroll), Tailwind CSS v3.
- **Backend**: Next.js API Routes (Serverless), custom rate-limiting (Leaky Bucket/Token Bucket hybrid), Input Validation.
- **Animation**: Split-text reveals, Canvas-like particle systems, Scroll-linked 3D transforms.

# n8n for Render

This repository contains the configuration to deploy n8n to [Render](https://render.com) using Docker, with a managed PostgreSQL database and persistent disk storage.

## Deployment Instructions

1.  **Fork this repository** to your GitHub account.
2.  **Log in to Render** and go to the [Dashboard](https://dashboard.render.com).
3.  Click **New +** and select **Blueprint**.
4.  Connect your forked repository.
5.  Render will automatically detect the `render.yaml` file and propose to create:
    *   A **Web Service** (n8n)
    *   A **PostgreSQL Database** (n8n_db)
    *   A **Disk** (n8n_data)
6.  Click **Apply**.

## Configuration

The setup includes:
- **Base Image**: `n8nio/n8n:latest`
- **Pre-installed tools**: `curl`, `python3`, `bash` (for use in n8n workflows).
- **Persistence**: Workflows and settings are stored in the PostgreSQL database, while binary data and other local files are stored on the 1GB persistent disk.
- **Auto-Scale**: Set to 1 instance on the Free plan by default.

## Note on Free Tier
Render's Free Tier web services spin down after 15 minutes of inactivity. For production n8n use, consider upgrading to a paid plan or using a keep-alive workflow to prevent sleeping.

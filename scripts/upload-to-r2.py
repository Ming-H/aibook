#!/usr/bin/env python3
"""
Upload devfox-vision images to Cloudflare R2.

Usage:
  1. pip install boto3
  2. Set environment variables (or create .env.r2):
     R2_ACCOUNT_ID=your_account_id
     R2_ACCESS_KEY_ID=your_access_key
     R2_SECRET_ACCESS_KEY=your_secret_key
     R2_BUCKET_NAME=devfox-inspiration
  3. python scripts/upload-to-r2.py [--dry-run]

Uploads:
  - output/{theme}/images/*.png → collections/{theme}/images/{filename}
  - gpt4o-image-prompts/*.png   → prompts/{filename}
"""

import os
import sys
import glob
import argparse

# Bypass proxy for R2 uploads
os.environ['NO_PROXY'] = '*'
os.environ.pop('http_proxy', None)
os.environ.pop('https_proxy', None)
os.environ.pop('HTTP_PROXY', None)
os.environ.pop('HTTPS_PROXY', None)
os.environ.pop('ALL_PROXY', None)
os.environ.pop('all_proxy', None)

def main():
    parser = argparse.ArgumentParser(description="Upload images to Cloudflare R2")
    parser.add_argument("--dry-run", action="store_true", help="List files without uploading")
    parser.add_argument("--source", default=None, help="Source directory (default: ../devfox-vision)")
    parser.add_argument("--collections-only", action="store_true", help="Only upload collection images")
    parser.add_argument("--prompts-only", action="store_true", help="Only upload prompt images")
    args = parser.parse_args()

    # Config
    account_id = os.environ.get("R2_ACCOUNT_ID")
    access_key = os.environ.get("R2_ACCESS_KEY_ID")
    secret_key = os.environ.get("R2_SECRET_ACCESS_KEY")
    bucket = os.environ.get("R2_BUCKET_NAME", "devfox-inspiration")

    source_dir = args.source or os.path.join(os.path.dirname(__file__), "..", "..", "devfox-vision")
    source_dir = os.path.abspath(source_dir)

    if not os.path.isdir(source_dir):
        print(f"Error: Source directory not found: {source_dir}")
        sys.exit(1)

    # Collect files to upload
    uploads = []  # (local_path, r2_key)

    # Collection images
    if not args.prompts_only:
        output_dir = os.path.join(source_dir, "output")
        if os.path.isdir(output_dir):
            for theme_dir in sorted(os.listdir(output_dir)):
                images_dir = os.path.join(output_dir, theme_dir, "images")
                if not os.path.isdir(images_dir):
                    continue
                for img in sorted(os.listdir(images_dir)):
                    if img.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
                        local = os.path.join(images_dir, img)
                        r2_key = f"collections/{theme_dir}/images/{img}"
                        uploads.append((local, r2_key))

    # GPT-4o prompt images
    if not args.collections_only:
        prompts_dir = os.path.join(source_dir, "gpt4o-image-prompts", "output")
        if not os.path.isdir(prompts_dir):
            prompts_dir = os.path.join(source_dir, "gpt4o-image-prompts")
        if os.path.isdir(prompts_dir):
            for img in sorted(os.listdir(prompts_dir)):
                if img.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
                    local = os.path.join(prompts_dir, img)
                    r2_key = f"prompts/{img}"
                    uploads.append((local, r2_key))

    # Summary
    total_size = sum(os.path.getsize(p) for p, _ in uploads)
    print(f"Files to upload: {len(uploads)}")
    print(f"Total size: {total_size / 1024 / 1024:.1f} MB")
    print(f"Target: s3://{bucket}")
    print()

    if args.dry_run:
        print("Dry run — listing files:")
        for local, key in uploads[:20]:
            size_mb = os.path.getsize(local) / 1024 / 1024
            print(f"  {key} ({size_mb:.1f} MB)")
        if len(uploads) > 20:
            print(f"  ... and {len(uploads) - 20} more files")
        return

    # Check credentials
    if not all([account_id, access_key, secret_key]):
        print("Error: Missing R2 credentials. Set these environment variables:")
        print("  R2_ACCOUNT_ID")
        print("  R2_ACCESS_KEY_ID")
        print("  R2_SECRET_ACCESS_KEY")
        print()
        print("Or create a .env.r2 file and source it:")
        print("  source .env.r2 && python scripts/upload-to-r2.py")
        sys.exit(1)

    # Upload
    try:
        import boto3
        from botocore.config import Config
    except ImportError:
        print("Error: boto3 not installed. Run: pip install boto3")
        sys.exit(1)

    endpoint = f"https://{account_id}.r2.cloudflarestorage.com"
    s3 = boto3.client(
        "s3",
        endpoint_url=endpoint,
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        config=Config(region_name="auto"),
    )

    # Check/create bucket
    try:
        s3.head_bucket(Bucket=bucket)
        print(f"Bucket '{bucket}' exists.")
    except Exception:
        print(f"Creating bucket '{bucket}'...")
        s3.create_bucket(Bucket=bucket)

    print()
    uploaded = 0
    skipped = 0
    failed = 0

    for i, (local, key) in enumerate(uploads):
        # Check if already uploaded (by key)
        try:
            s3.head_object(Bucket=bucket, Key=key)
            skipped += 1
            if (i + 1) % 50 == 0:
                print(f"  [{i+1}/{len(uploads)}] Skipped (exists): {key}")
            continue
        except Exception:
            pass

        try:
            content_type = "image/png"
            if key.endswith(".jpg") or key.endswith(".jpeg"):
                content_type = "image/jpeg"
            elif key.endswith(".webp"):
                content_type = "image/webp"

            s3.upload_file(
                local,
                bucket,
                key,
                ExtraArgs={"ContentType": content_type, "CacheControl": "public, max-age=31536000"},
            )
            uploaded += 1
            size_mb = os.path.getsize(local) / 1024 / 1024
            print(f"  [{i+1}/{len(uploads)}] Uploaded: {key} ({size_mb:.1f} MB)")
        except Exception as e:
            failed += 1
            print(f"  [{i+1}/{len(uploads)}] FAILED: {key} — {e}")

    print()
    print(f"Done! Uploaded: {uploaded}, Skipped: {skipped}, Failed: {failed}")


if __name__ == "__main__":
    main()

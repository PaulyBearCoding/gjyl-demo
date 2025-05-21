const express = require('express');
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const advancedMediaController = require('../../controllers/advanced-media.controller');
const advancedUploadService = require('../../services/advanced-upload.service');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Advanced Media
 *   description: Enhanced media upload, processing, and management
 */

/**
 * @swagger
 * /advanced-media/init-upload:
 *   post:
 *     summary: Initialize a chunked upload
 *     description: Initialize a new chunked upload session.
 *     tags: [Advanced Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - filename
 *               - fileSize
 *               - contentType
 *             properties:
 *               filename:
 *                 type: string
 *                 description: Original filename
 *               fileSize:
 *                 type: number
 *                 description: File size in bytes
 *               contentType:
 *                 type: string
 *                 description: MIME type of the file
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uploadId:
 *                   type: string
 *                 maxChunkSize:
 *                   type: number
 *                 totalChunks:
 *                   type: number
 *                 expiresAt:
 *                   type: string
 *                   format: date-time
 */
router.post('/init-upload', auth(), advancedMediaController.initializeUpload);

/**
 * @swagger
 * /advanced-media/upload-chunk:
 *   post:
 *     summary: Upload a chunk
 *     description: Upload a chunk of a file.
 *     tags: [Advanced Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - uploadId
 *               - chunkNumber
 *               - totalChunks
 *               - chunk
 *             properties:
 *               uploadId:
 *                 type: string
 *               chunkNumber:
 *                 type: number
 *               totalChunks:
 *                 type: number
 *               filename:
 *                 type: string
 *               chunk:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 uploadId:
 *                   type: string
 *                 chunkNumber:
 *                   type: number
 *                 completed:
 *                   type: boolean
 */
router.post('/upload-chunk', auth(), advancedUploadService.uploadConfigs.chunk, advancedMediaController.uploadChunk);

/**
 * @swagger
 * /advanced-media/finalize-upload/{uploadId}:
 *   post:
 *     summary: Finalize upload
 *     description: Finalize and process a completed chunked upload.
 *     tags: [Advanced Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uploadId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalChunks:
 *                 type: number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 uploadId:
 *                   type: string
 *                 fileInfo:
 *                   type: object
 *                 urls:
 *                   type: object
 */
router.post('/finalize-upload/:uploadId', auth(), advancedMediaController.finalizeUpload);

/**
 * @swagger
 * /advanced-media/metadata:
 *   get:
 *     summary: Get media metadata
 *     description: Extract metadata from a media file.
 *     tags: [Advanced Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 metadata:
 *                   type: object
 */
router.get('/metadata', auth(), advancedMediaController.getMediaMetadata);

/**
 * @swagger
 * /advanced-media/generate-thumbnail:
 *   post:
 *     summary: Generate thumbnail
 *     description: Generate a thumbnail from a video file.
 *     tags: [Advanced Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - videoPath
 *             properties:
 *               videoPath:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 thumbnailUrl:
 *                   type: string
 */
router.post('/generate-thumbnail', auth(), advancedMediaController.generateThumbnail);

/**
 * @swagger
 * /advanced-media/transcode:
 *   post:
 *     summary: Transcode video
 *     description: Transcode a video to multiple resolutions.
 *     tags: [Advanced Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - videoPath
 *             properties:
 *               videoPath:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 versions:
 *                   type: object
 */
router.post('/transcode', auth(), advancedMediaController.transcodeVideo);

module.exports = router;
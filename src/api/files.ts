import axios from "axios"
import { PartEtagInfo } from "../models/PartEtagInfo"

export class FilesService {
	static async StartMultipart(
		fileName: string,
		contentType: string,
		size: number
	) {
		return axios.post<{
			key: string
			uploadId: string
			bucketName: string
			prefix: string
		}>("http://localhost:5101/files/multipart-upload", {
			BucketName: "files",
			Prefix: "videos",
			fileName,
			contentType,
			size,
		})
	}

	static async UploadPart(url: string, chunk: Blob) {
		return axios.put(url, chunk, {
			headers: { "Content-Type": chunk.type },
		})
	}

	static async GetPresignedUrl(
		key: string,
		uploadId: string,
		partNumber: number,
		BucketName: string,
		contentType: string,
		prefix: string,
		fileName: string
	) {
		return axios.post<{ key: string; url: string }>(
			`http://localhost:5101/files/${key}/presigned-part`,
			{
				uploadId,
				partNumber,
				BucketName,
				contentType,
				Prefix: prefix,
				fileName,
			}
		)
	}

	static async CompleteMultipart(
		key: string,
		uploadId: string,
		bucketName: string,
		contentType: string,
		prefix: string,
		fileName: string,
		parts: PartEtagInfo[]
	) {
		return axios.post<{ key: string; location: string }>(
			`http://localhost:5101/files/${key}/complete-multipart`,
			{
				uploadId,
				bucketName,
				contentType,
				Prefix: prefix,
				fileName,
				parts,
			}
		)
	}
}

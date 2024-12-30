import axios from "axios"
import { PartEtagInfo } from "../models/PartEtagInfo"

export class FilesService {
	static async StartMultipart(
		fileName: string,
		contentType: string,
		size: number
	) {
		return axios.post<{ key: string; uploadId: string }>(
			"http://localhost:5101/files/multipart",
			{
				fileName,
				contentType,
				size,
			}
		)
	}

	static async UploadPart(url: string, chunk: Blob) {
		return axios.put(url, chunk, {
			headers: { "Content-Type": chunk.type },
		})
	}

	static async GetPresignedUrl(
		key: string,
		uploadId: string,
		partNumber: number
	) {
		return axios.post<{ key: string; url: string }>(
			`http://localhost:5101/files/${key}/presigned-part`,
			{
				uploadId,
				partNumber,
			}
		)
	}

	static async CompleteMultipart(
		key: string,
		uploadId: string,
		parts: PartEtagInfo[]
	) {
		return axios.post<{ key: string; location: string }>(
			`http://localhost:5101/files/${key}/complete-multipart`,
			{
				uploadId,
				parts,
			}
		)
	}
}

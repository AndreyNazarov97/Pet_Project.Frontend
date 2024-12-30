import { Button } from "@mui/material"
import { FilesService } from "../api/files"
import { PartEtagInfo } from "../models/PartEtagInfo"

export function Upload() {
	const handleFileChange = async (file: File) => {
		const {
			data: { key, uploadId },
		} = await FilesService.StartMultipart(file.name, file.type, file.size)

		const chunkSize = 10 * 1024 * 1024 // 10MB
		const parts: PartEtagInfo[] = []
		let partNumber = 1

		for (let start = 0; start < file.size; start += chunkSize) {
			const chunk = file.slice(start, start + chunkSize)

			const presignedUrl = await FilesService.GetPresignedUrl(
				key,
				uploadId,
				partNumber
			)

			const response = await FilesService.UploadPart(
				presignedUrl.data.url,
				chunk
			)

			const etag = response.headers["etag"] as string

			parts.push({
				PartNumber: partNumber,
				ETag: etag,
			})
			partNumber++
		}

		const response = await FilesService.CompleteMultipart(key, uploadId, parts)

		alert(`File uploaded successfully!` + response.data.location)
	}

	return (
		<section className="flex flex-col px-10 py-8 gap-6 w-full">
			<Button component="label" variant="contained" tabIndex={-1}>
				upload
				<input
					type="file"
					className="hidden"
					accept="video/*"
					multiple={false}
					onChange={(e) => handleFileChange(e.target.files![0])}
				/>
			</Button>

			{/* {Object.keys(uploadProgress).map((partNumber) => (
				<div key={partNumber}>
					<Typography variant="body1">
						Part {partNumber} - {uploadProgress[Number(partNumber)]}%
					</Typography>
					<LinearProgress
						variant="determinate"
						value={uploadProgress[partNumber]}
					/>
				</div>
			))} */}
		</section>
	)
}

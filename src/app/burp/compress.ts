import JSZip from "jszip"

 
export type TFile = {
    filename: string
    data: string
}

export const compress = async (files: Array<TFile>): Promise<Blob> => {
    const zip = new JSZip()
    files.forEach(file => zip.file(file.filename, file.data))
    const archiveBytes = await zip.generateAsync(
        {type : "blob"}
    )

    return new Promise((resolve) => {
        resolve(archiveBytes)
    })
    // .then(
    //     archiveBytes => saveAs(archiveBytes, 'archive.zip', {autoBom: false})
    // )
}
import fs, { PathLike } from 'fs'
// import path from 'path'

const { readdir, lstat } = fs.promises

export async function getFiles (folder: PathLike): Promise<string[]> {
    try {
        const items = await readdir(folder)
        let files: string[] = []
        for (const item of items) {
            const pathFileOrFolder = `${folder}/${item}`
            const isDirectory = (await lstat(pathFileOrFolder)).isDirectory()
            if (isDirectory) {
                files = [...files, ...(await getFiles(pathFileOrFolder))]
            } else files.push(pathFileOrFolder)
        }
        return files
    } catch (e) {
        return e
    }
}

// getFiles(path.resolve(__dirname, '../../../migrations-database')).then(_ => console.log(_))
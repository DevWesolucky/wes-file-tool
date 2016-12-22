const fs = require("fs");
const path = require("path");

class FileTool
{

    static createDir(dirPath)
    {
        if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
    }

    static fileExists(filePath)
    {
        return fs.existsSync(filePath);
    }

    static isDir(filePath)
    {
        return fs.lstatSync(filePath).isDirectory()
    }

    static getFileExtension(filePath)
    {
        return path.extname(filePath);
    }

    static getAbsolutePath()
    {
        return path.resolve();
    }

    static createParentDir(filePath)
    {
        filePath = FileTool.pathToSlashPath(filePath);
        let dirPath = filePath.substr(0, filePath.lastIndexOf("/"));
        this.createDir(dirPath);
    }

    static pathToSlashPath(filePath)
    {
        return filePath.replace(/\\/g,"/");
    }

    static copyFile(fromPath, toPath)
    {
        fs.writeFileSync(toPath, fs.readFileSync(fromPath));
    }


    static removeFilesByExtList(dirPath, extList)
    {
        if (!FileTool.fileExists(dirPath)) return;
        let fileInfoList = FileTool.findFilesByExtList(dirPath, extList);
        for (let fileInfo of fileInfoList) 
        {
            fs.unlinkSync(fileInfo.path);
        }
    }

    static findFilesByExtList(dirPath, extList)
    {
        let fileInfoList = [];
        dirPath = FileTool.pathToSlashPath(dirPath);

        let files = fs.readdirSync(dirPath);
        for (let f of files) 
        {
            let ext = path.extname(f);
            let subFilePath = dirPath + "/" + f;

            let fileInfo = {
                name: path.basename(subFilePath),
                path: subFilePath,
                extension: ext,
                id: 0
            };

            let extToLowerCase = ext.toLowerCase();
            if (extList.indexOf(extToLowerCase) > -1 || extList.length === 0)
            {
                fileInfo.id = fileInfoList.length;
                fileInfoList.push(fileInfo);
            }
        }

        return fileInfoList;
    }

    static getFileExtension(filePath)
    {
        return path.extname(filePath);
    }


    static readTextFile(filePath)
    {
        let str = fs.readFileSync(filePath, "utf8");
        return str;
    }

}

module.exports = FileTool;
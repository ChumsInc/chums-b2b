import fs from "node:fs/promises";
import Debug from "debug";
import {Request, Response} from "express";
import path from "node:path";
const debug = Debug('chums:server:version');

interface PackageConfig {
    version?:string;
}
export async function loadVersion():Promise<{versionNo: string}> {
    try {
        const packageJSON = await fs.readFile(path.join(process.cwd(), 'package.json'));

        const packageConfig:PackageConfig = JSON.parse(Buffer.from(packageJSON).toString() ?? '{}');
        return {versionNo: packageConfig.version ?? ''};
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("loadVersion()", err.message);
            return Promise.reject(err);
        }
        return Promise.reject(new Error(err?.toString()));
    }
}

export const getVersion = async (req:Request, res:Response):Promise<void> => {
    try {
        const version = await loadVersion();
        res.json({version});
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("getVersion()", err.message);
            res.json({error: err.message, name: err.name});
            return
        }
        res.json({error: 'unknown error in getVersion'});
    }
}

export const getVersionJS = async (req:Request, res:Response):Promise<void> => {
    try {
        const {versionNo} = await loadVersion();
        const js = 'CHUMS.version = ' + JSON.stringify(versionNo);
        res.set('Content-Type', 'application/javascript')
            .send(js);
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("getVersionJS()", err.message);
            res.json({error: err.message, name: err.name});
            return;
        }
        res.json({error: 'unknown error in getVersionJS'});
    }
}

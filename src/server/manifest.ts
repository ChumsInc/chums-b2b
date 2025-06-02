import fs from "node:fs/promises";
import Debug from "debug";
import {loadVersion} from "./version";
import {Request, Response} from "express";
import path from "node:path";
const debug = Debug('chums:server:manifest');

export interface ManifestFiles {
    'vendors-react.js'?: string;
    'vendors-mui.js'?: string;
    'vendors.js'?: string;
    'chums.js'?: string;
    'main.js'?: string;
    version?: string;
}
export async function loadManifest():Promise<ManifestFiles> {
    try {
        const {versionNo} = await loadVersion();
        const manifestFile = await fs.readFile(path.join(process.cwd(), './public/build/manifest.json'));
        const manifestJSON = Buffer.from(manifestFile).toString();

        let manifestFiles:ManifestFiles = {};
        try {
            manifestFiles = JSON.parse(manifestJSON || '{}');
        } catch (err:unknown) {
            if (err instanceof Error) {
                debug('loadManifest() error parsing manifest', err.message);
            }
        }
        return {...manifestFiles, version: versionNo};
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("loadManifest()", err.message);
            return Promise.reject(err);
        }
        return Promise.reject(new Error(err?.toString()));
    }
}

export const getManifest = async (req:Request, res: Response):Promise<void> => {
    try {
        const manifest = await loadManifest();
        res.json(manifest);
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("getManifest()", err.message);
            res.json({error: err.message, name: err.name});
            return;
        }
        res.json({error: 'unknown error in getManifest'});
    }
}

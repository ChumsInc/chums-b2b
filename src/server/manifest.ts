import fs from "node:fs/promises";
import _debug from 'debug';
import {loadVersion} from "./version";
import type {Request, Response} from "express";
import path from "node:path";
const debug = _debug('chums:server:manifest');
import process from "node:process";
import {Buffer} from 'node:buffer'

export interface ManifestFiles {
    index?: string;
    imports: string[];
    version?: string;
}
export async function loadManifest():Promise<ManifestFiles> {
    try {
        const {versionNo} = await loadVersion();
        const manifestFile = await fs.readFile(path.join(process.cwd(), './dist-client/.vite/manifest.json'));
        const manifestJSON = Buffer.from(manifestFile).toString();

        const manifestFiles:ManifestFiles = {
            imports: []
        };
        try {
            const json = JSON.parse(manifestJSON || '{}');
            // debug('loadManifest() manifestJSON', json);
            const file = json['src/client/index.tsx']?.file;
            if (file) {
                manifestFiles.index = file;
            }
            for (const key of json['src/client/index.tsx']?.imports ?? []) {
                const importFile = json[key].file as string;
                if (importFile) {
                    manifestFiles.imports.push(importFile)
                }
            }
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

export const getManifest = async (_:Request, res: Response) => {
    try {
        const manifest = await loadManifest();
        res.json(manifest);
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("getManifest()", err.message);
            res.json({error: err.message, name: err.name});
            return
        }
        res.json({error: 'unknown error in getManifest'});
    }
}

import 'dotenv/config';
import express from 'express';
import _debug from 'debug';
import {readFile} from 'node:fs/promises'
import process from 'node:process';

const debug = _debug('chums:dev-version-proxy');

async function getVersion() {
    try {
        const packageJson = await readFile('./package.json', 'utf8');
        const json = JSON.parse(Buffer.from(packageJson).toString());
        return json?.version ?? 'N/A';
    } catch(err) {
        if (err instanceof Error) {
            debug("getVersion()", err.message);
            return Promise.reject(err);
        }
        debug("getVersion()", err);
        return Promise.reject(new Error('Error in getVersion()'));
    }
}

const app = express();

app.get('/version', async (_, res) => {
    const version = await getVersion();
    debug(`version: ${version}`);
    res.send({
        version: {
            versionNo: `localhost/${version}`
        }
    });
});

app.listen(process.env.DEV_VERSION_PROXY_PORT ?? 3001, () => {
    debug(`server running at localhost:${process.env.DEV_VERSION_PROXY_PORT ?? 3001}`);
});

import global from '@app/global-window';

export const isLocalHost = () => {
    const host = global.window?.location?.host;

    return host?.toLowerCase().startsWith('localhost') || host.startsWith('127.0.0.1');
}

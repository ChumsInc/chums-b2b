
export const isLocalHost = () => {
    const host = window?.location?.host;

    return host?.toLowerCase().startsWith('localhost') || host.startsWith('127.0.0.1');
}

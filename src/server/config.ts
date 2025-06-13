interface Config {
    contentDir: string;
    logDir: string;
    privKeyFile: string;
    certFile: string;
    httpsPort: string;
}

let config: Config | undefined = undefined;

function getParam(paramName: string): string {
    const paramIndex = process.argv.findIndex(arg => arg.startsWith(`--${paramName}`));
    if (paramIndex === -1 || paramIndex + 1 >= process.argv.length) {
        throw new Error(`Missing required parameter: --${paramName}`);
    }
    return process.argv[paramIndex + 1];
}

export function getConfig(): Config {
    try {
        if (!config) {
            const contentDir = getParam('contentDir');
            const logDir = getParam('logDir');
            const privKeyFile = getParam('privKeyFile');
            const certFile = getParam('certFile');
            const httpsPort = getParam('httpsPort');

            config = {
                contentDir,
                logDir,
                privKeyFile,
                certFile,
                httpsPort,
            };
        }

        return config;
    }
    catch (e) {
        throw e;
    }
}
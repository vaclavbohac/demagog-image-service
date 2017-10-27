import { createHash } from "crypto";
import * as fs from "fs";
import * as http from "http";
import * as request from "request";
import { isRequestInvalid } from "./validation";

function logger(message: string): void {
    // tslint:disable-next-line:no-console
    console.log(message);
}

function getServerUri(): string {
    return process.env.SERVER_URI;
}

http
    .createServer((req, res) => {
        if (!req.url) {
            logger("Missing url");
            res.writeHead(400);
            return res.end();
        }

        if (isRequestInvalid(req.url)) {
            logger(`Url "${req.url}" is invalid`);

            res.writeHead(404);
            return res.end();
        }

        res.setHeader("Cache-Control", "public, max-age=315360000");

        const hash = createHash("md5")
            .update(req.url)
            .digest("hex");

        const cachedFile = `uploads/${hash}.png`;

        if (fs.existsSync(cachedFile)) {
            logger(`Serving "${req.url}" from cache.`);

            return fs
                .createReadStream(cachedFile)
                .pipe(res);
        }

        logger(`Fetching "${req.url}" from remote server.`);

        const saveFile$ = fs
            .createWriteStream(`uploads/${hash}.png`);

        const readFile$ = request
            .get(`${getServerUri()}${req.url}`)
            .on("data", (data: string) => res.write(data))
            .on("end", () => res.end());

        readFile$.pipe(saveFile$);
    })
    .listen(process.env.PORT || 3001);

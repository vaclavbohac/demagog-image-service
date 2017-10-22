import { createHash } from "crypto";
import * as fs from "fs";
import * as http from "http";
import * as request from "request";

http
    .createServer((req, res) => {
        if (!req.url) {
            res.writeHead(400);
            return res.end();
        }

        const hash = createHash("md5")
            .update(req.url)
            .digest("hex");

        const cachedFile = `uploads/${hash}.png`;

        // tslint:disable-next-line:no-console
        console.log(req.url);

        if (fs.existsSync(cachedFile)) {
            return fs
                .createReadStream(cachedFile)
                .pipe(res);
        }

        const saveFile$ = fs
            .createWriteStream(`uploads/${hash}.png`);

        const readFile$ = request
            .get(`http://demagog.cz/${req.url}`)
            .on("data", (data: string) => res.write(data))
            .on("end", () => res.end());

        readFile$.pipe(saveFile$);
    })
    .listen(process.env.PORT || 3001);

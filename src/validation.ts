const VALID_FILE_TYPES = ["png", "jpeg", "jpg"];

function getFileType(url: string): string {
    const chunks = url.split(".");
    return chunks[chunks.length - 1];
}

function isFileTypeSupported(fileType: string): boolean {
    return VALID_FILE_TYPES.includes(fileType.toLowerCase());
}

export function isRequestInvalid(url: string): boolean {
    return !isFileTypeSupported(getFileType(url));
}

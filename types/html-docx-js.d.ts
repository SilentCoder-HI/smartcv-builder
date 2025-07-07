declare module "html-docx-js" {
    const htmlDocx: {
        asBlob: (html: string) => Blob;
        asBuffer: (html: string) => Buffer;
    };
    export default htmlDocx;
}

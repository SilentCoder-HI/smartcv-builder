// utils/paginateHtml.ts
type PageSize = "A4" | "Letter" | "Legal";

const PAGE_DIMENSIONS: Record<PageSize, { width: number; height: number }> = {
    A4: { width: 794, height: 1122 },       // px at 96dpi
    Letter: { width: 816, height: 1056 },   // 8.5"x11"
    Legal: { width: 816, height: 1344 },    // 8.5"x14"
};

export function paginateHtml(
    rawHtml: string,
    page: PageSize | number = "A4" // can pass string or custom height in px
): string[] {
    let pageWidth = 794;
    let pageHeight = 1122;

    if (typeof page === "string") {
        const size = PAGE_DIMENSIONS[page];
        pageWidth = size.width;
        pageHeight = size.height;
    } else if (typeof page === "number") {
        pageHeight = page;
    }

    // Create a hidden container to measure content
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.visibility = "hidden";
    container.style.width = `${pageWidth}px`;
    container.style.top = "-9999px";
    container.innerHTML = rawHtml;
    document.body.appendChild(container);

    const pages: string[] = [];
    let currentPage = document.createElement("div");
    currentPage.style.width = `${pageWidth}px`;
    currentPage.style.minHeight = `${pageHeight}px`;
    currentPage.style.overflow = "hidden";

    // Iterate through child nodes and append until height limit
    Array.from(container.childNodes).forEach((node) => {
        currentPage.appendChild(node.cloneNode(true));

        if (currentPage.scrollHeight > pageHeight) {
            // Exceeded height -> remove last added, push page, start new
            currentPage.removeChild(currentPage.lastChild as Node);
            pages.push(currentPage.innerHTML);

            currentPage = document.createElement("div");
            currentPage.style.width = `${pageWidth}px`;
            currentPage.style.minHeight = `${pageHeight}px`;
            currentPage.appendChild(node.cloneNode(true));
        }
    });

    // Push last page
    if (currentPage.innerHTML.trim() !== "") {
        pages.push(currentPage.innerHTML);
    }

    // Clean up
    document.body.removeChild(container);

    return pages;
}

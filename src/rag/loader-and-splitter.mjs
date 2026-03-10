import "dotenv/config";
import "cheerio";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// 使用 CheerioWebBaseLoader 加载网页，提取p标签
const cheerioLoader = new CheerioWebBaseLoader(
    "https://juejin.cn/post/7233327509919547452",
    {
        selector: '.main-area p'
    }
);

const documents = await cheerioLoader.load();

const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400, // 每个文档片段的最大字符数
    chunkOverlap: 50, // 每个文档片段之间的重叠字符数
    separators: ["。", "！", "？"], // 用于分割文档的分隔符
});

const splitDocuments = await textSplitter.splitDocuments(documents);
console.log(splitDocuments);
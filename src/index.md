bindTools后大模型的返回消息会包含调用工具的参数（以前叫function call）

SystemMessage：设置 AI 是谁，可以干什么，有什么能力，以及一些回答、行为的规范等
HumanMessage：用户输入的信息
AIMessage：AI 的回复信息
ToolMessage：调用工具的结果返回 
invoke作用是调用大模型，传入消息历史，返回大模型的回复

MCP
MCP 本质还是tool 最大的特点就是可以跨进程调用工具，跨本地的进程调用，就用 stdio。跨远程的进程调用，就用 http
两种类型：resource 主要是查询信息用的（read）， 而 tool 是执行功能用的（call）
两个核心概念，mac client 和 mcp server，mac client作为tool绑定到大模型，mcp server侧实现具体的工具调用逻辑

filesystem: mcp 官方维护的一个 mcp server，用于文件操作
卡片搭建的api可以封装成MCP，发个 npm 包


npx是什么：临时执行npm包里的命令行程序，临时拉包，执行完就清理，不污染全局

嵌入模型：
嵌入模型是将文本转换为向量表示的模型，用于表示文本的语义信息。在 RAG 中，嵌入模型用于将文档转换为向量表示，以便进行相似度搜索。

rag:（检索 增强 生成）
1. 从文档创建向量存储
2. 使用 retriever 获取文档，返回余弦相似度最高的前 3 个文档
3. 使用 similaritySearchWithScore 获取相似度评分
4. 组装增强后的prompt，包含问题和检索到的文档
5. 调用大模型，传入增强后的prompt，返回大模型的回复

chunkOverlap：每个文档片段之间的重叠字符数，用于保持文档的连贯性（当按标点分割后的文本仍然超过了 chunkSize 时，就会出现重叠）

RecursiveCharacterTextSplitter：递归字符文本分割器，用于将文本递归地按指定的分隔符分割成多个文档片段,相对比较灵活

如何封装http mcp server：
1. 搭建http server
2. 用@modelcontextprotocol/sdk/server/mcp.js 实现mcp server的逻辑
3. 用@modelcontextprotocol/sdk/server/http.js 实现http server的逻辑


??agent设计三原则：
1. 所有context沉淀和传递都是文件
2. 所有操作都由bash命令自举完成（可以沉淀tools放到1，减少token浪费）
3. subagent并行操作只筛选一个，不merge

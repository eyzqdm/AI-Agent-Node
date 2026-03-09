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

??agent设计三原则：
1. 所有context沉淀和传递都是文件
2. 所有操作都由bash命令自举完成（可以沉淀tools放到1，减少token浪费）
3. subagent并行操作只筛选一个，不merge
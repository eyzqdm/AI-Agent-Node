bindTools后大模型的返回消息会包含调用工具的参数

SystemMessage：设置 AI 是谁，可以干什么，有什么能力，以及一些回答、行为的规范等
HumanMessage：用户输入的信息
AIMessage：AI 的回复信息
ToolMessage：调用工具的结果返回 
invoke作用是调用大模型，传入消息历史，返回大模型的回复

??agent设计三原则：
1. 所有context沉淀和传递都是文件
2. 所有操作都由bash命令自举完成（可以沉淀tools放到1，减少token浪费）
3. subagent并行操作只筛选一个，不merge
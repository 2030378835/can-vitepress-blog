const  defaultConfig  = require('../vitepress.config.ts');

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
const docsDir = path.join(__dirname, '../'+defaultConfig.docsBaseDir);

// 提供静态文件服务
app.use(defaultConfig.docsImageDir, express.static(path.join(__dirname, `../docs/public${defaultConfig.docsImageDir}`)));
app.use(express.static('dist'));
// 添加这行代码，用于解析JSON格式的请求体
app.use(express.json());
// 配置 multer 存储选项
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body); // 调试信息，查看 req.body 内容
    const myPath = req.body.path || '';
    const dir = path.join(__dirname, `../docs/public${defaultConfig.docsImageDir}/`, myPath); // 根目录下的 img 文件夹
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true }); // 确保递归创建目录
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // 重命名文件以避免冲突
  }
});

const upload = multer({ storage: storage });
// 处理文件上传
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = `${defaultConfig.base}${defaultConfig.docsImageDir}/${req.file.filename}`;
  res.json({ data: { 
    url: fileUrl,
    renderUrl: `http://localhost:5173${defaultConfig.base}/public${defaultConfig.docsImageDir}/${req.file.filename}`
  } });
});

// 处理md文件生成
app.post('/submit', (req, res) => {
  const { text, FilePath } = req.body;
  const dir = path.join(docsDir, FilePath);
  console.log('docsDir', docsDir, FilePath, dir);

  // 判断dir是否存在
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('dir', dir);
  }
  if (!text) {
    res.json({
      code: 400,
      data: null,
      message: 'Text is required'
    })
    return res.status(400).json({ error: 'Text is required' });
  }
  // 拿到dir下的文件数量
  const fileList = fs.readdirSync(dir);
  const fileCount = fileList.length;
  // 在dir目录下创建 md 文件并将text写入
  const fileName = `${fileCount+1}.md`;
  const filePath = path.join(dir, fileName);
  fs.writeFileSync(filePath, text);
  const html = text;
  res.json({
    code: 200,
    data: html,
    message: 'success'
  });
  // return
  // 读取文件内容
  const fileContent = fs.readFileSync('../vitepress.config.ts', 'utf8');
  // 将读取的内容转化成数组
  const fileContentArr = fileContent.split('\n');
  // 找到docsKindDir所在的行数
  const docsKindDirIndex = fileContentArr.findIndex(item => item.includes('docsKindDir'));
  //  判断是否已经有分类 
  const is = fileContentArr[docsKindDirIndex].split(']')[0].split('[')[1]
  const isExist = is.split("'").includes(FilePath); //判断是否有这个分类了
  if (isExist) { 
    return
  }
  const newA = fileContentArr[docsKindDirIndex].split(']').join(`${is ? ',' : ''}'${FilePath}']`);
  fileContentArr[docsKindDirIndex] = newA;
  const newFileContent = fileContentArr.join('\n');
  // 写入文件内容
  fs.writeFileSync('../vitepress.config.ts', newFileContent);
});

// 拿到docs文件夹下的文件夹列表
app.post('/getDirList', (req, res) => {
  const dir = docsDir;
  // 拿到dir文件夹下的文件夹列表
  const dirList = fs.readdirSync(dir);
  const result = [];
  dirList.forEach(item => {
    const itemPath = path.join(dir, item);
    const itemStat = fs.statSync(itemPath);
    if (itemStat.isDirectory()) {
      result.push(item);
    }
  });
  res.json({
    code: 200,
    data: result,
    message: 'success'
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
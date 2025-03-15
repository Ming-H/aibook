// 这个脚本用于生成新闻占位图片
// 在实际项目中，请使用真实的图片资源
// 要运行此脚本，请安装 sharp: npm install sharp

const fs = require('fs');
const path = require('path');

// 确保目录存在
const newsImagesDir = path.join(__dirname, '../public/images/news');
if (!fs.existsSync(newsImagesDir)) {
    fs.mkdirSync(newsImagesDir, { recursive: true });
}

// 创建占位图片
const categories = [
    'ai-research',
    'industry-news',
    'policy-regulation',
    'ai-applications',
    'company-updates'
];

// 输出脚本说明
console.log('新闻图片生成脚本');
console.log('----------------');
console.log('此脚本会创建占位图片，但需要真实的图片才能在生产环境使用。');
console.log('请创建以下文件并放入适当的图片:');
console.log('');

// 占位图片清单
['placeholder.jpg'].concat(
    categories.flatMap(category => [
        `${category}-1.jpg`,
        `${category}-2.jpg`,
        `${category}-3.jpg`
    ])
).forEach(filename => {
    const filePath = path.join(newsImagesDir, filename);
    console.log(`- ${filePath}`);

    // 如果文件不存在，则创建空白占位文件
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, 'This is a placeholder for an image file.');
    }
});

console.log('');
console.log('完成后请删除此脚本。'); 
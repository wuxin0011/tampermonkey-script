// 需要安装的第三方库
const { JSDOM } = require("jsdom");
const marked = require("marked");

//
const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "../0x3f-leetcode/new_0x3f.json");
const OLD_FILE_PATH = path.join(__dirname, "../0x3f-leetcode/0x3f.json");
const DATA = path.join(__dirname, "../0x3f-leetcode/data.json");


const defaultUrls = [
  {
    title: "数学算法（数论/组合/概率期望/博弈/计算几何/随机算法",
    link: "https://leetcode.cn/discuss/post/3584388/fen-xiang-gun-ti-dan-shu-xue-suan-fa-shu-gcai/",
    tot: 0,
    ac: 0,
    id: 1,
    disabled: false,
    select: true,
  },
  {
    title:
      "常用数据结构（前缀和/差分/栈/队列/堆/字典树/并查集/树状数组/线段树）",
    link: "https://leetcode.cn/discuss/post/3583665/fen-xiang-gun-ti-dan-chang-yong-shu-ju-j-bvmv/",
    tot: 0,
    ac: 0,
    id: 2,
    disabled: false,
    select: true,
  },
  {
    title: "动态规划（入门/背包/状态机/划分/区间/状压/数位/树形/数据结构优化）",
    link: "https://leetcode.cn/discuss/post/3581838/fen-xiang-gun-ti-dan-dong-tai-gui-hua-ru-007o/",
    tot: 0,
    ac: 0,
    id: 3,
    disabled: false,
    select: true,
  },
  {
    title:
      "图论算法（DFS/BFS/拓扑排序/最短路/最小生成树/二分图/基环树/欧拉路径）",
    link: "https://leetcode.cn/discuss/post/3581143/fen-xiang-gun-ti-dan-tu-lun-suan-fa-dfsb-qyux/",
    tot: 0,
    ac: 0,
    id: 4,
    disabled: false,
    select: true,
  },
  {
    title: "位运算（基础/性质/拆位/试填/恒等式/贪心/脑筋急转弯）",
    link: "https://leetcode.cn/discuss/post/3580371/fen-xiang-gun-ti-dan-wei-yun-suan-ji-chu-nth4/",
    tot: 0,
    ac: 0,
    id: 5,
    disabled: false,
    select: true,
  },
  {
    title: "网格图（DFS/BFS/综合应用)",
    link: "https://leetcode.cn/discuss/post/3580371/fen-xiang-gun-ti-dan-wei-yun-suan-ji-chu-nth4/",
    tot: 0,
    ac: 0,
    id: 6,
    disabled: false,
    select: true,
  },
  {
    title: "单调栈（矩形面积/贡献法/最小字典序",
    link: "https://leetcode.cn/discuss/post/3579480/ti-dan-dan-diao-zhan-ju-xing-xi-lie-zi-d-u4hk/",
    tot: 0,
    ac: 0,
    id: 7,
    disabled: false,
    select: true,
  },
  {
    title: "二分算法（二分答案/最小化最大值/最大化最小值/第K小",
    link: "https://leetcode.cn/discuss/post/3579164/ti-dan-er-fen-suan-fa-er-fen-da-an-zui-x-3rqn/",
    tot: 0,
    ac: 0,
    id: 8,
    disabled: true,
    select: true,
  },
  {
    title: "滑动窗口（定长/不定长/多指针",
    link: "https://leetcode.cn/discuss/post/3578981/ti-dan-hua-dong-chuang-kou-ding-chang-bu-rzz7/",
    tot: 0,
    ac: 0,
    id: 9,
    disabled: false,
    select: true,
  },
  {
    title: "贪心算法（基本贪心策略/反悔/区间/字典序/数学/思维/构造）",
    link: "https://leetcode.cn/discuss/post/3091107/fen-xiang-gun-ti-dan-tan-xin-ji-ben-tan-k58yb/",
    tot: 0,
    ac: 0,
    id: 10,
    disabled: false,
    select: true,
  },
  {
    title: "链表、二叉树与一般树（前后指针/快慢指针/DFS/BFS/直径/LCA）",
    link: "https://leetcode.cn/discuss/post/3142882/fen-xiang-gun-ti-dan-lian-biao-er-cha-sh-6srp/",
    tot: 0,
    ac: 0,
    id: 11,
    disabled: false,
    select: true,
  },
  {
    title:
      "字符串（KMP/Z函数/Manacher/字符串哈希/AC自动机/后缀数组/子序列自动机）",
    link: "https://leetcode.cn/discuss/post/3144832/fen-xiang-gun-ti-dan-zi-fu-chuan-kmpzhan-ugt4/",
    tot: 0,
    ac: 0,
    id: 12,
    disabled: false,
    select: true,
  },
  // { 'title': '灵茶题单完成情况', 'link': 'https://leetcode.cn/u/endlesscheng/', 'tot': 0, 'ac': 0, 'id': 0x3f3f3f3f,'disabled':true,'select':false },
];

const old_url_map = {
  "https://leetcode.cn/circle/discuss/IYT3ss/":
    "https://leetcode.cn/discuss/post/3584388/fen-xiang-gun-ti-dan-shu-xue-suan-fa-shu-gcai/",
  "https://leetcode.cn/circle/discuss/mOr1u6/":
    "https://leetcode.cn/discuss/post/3583665/fen-xiang-gun-ti-dan-chang-yong-shu-ju-j-bvmv/",
  "https://leetcode.cn/circle/discuss/tXLS3i/":
    "https://leetcode.cn/discuss/post/3581838/fen-xiang-gun-ti-dan-dong-tai-gui-hua-ru-007o/",
  "https://leetcode.cn/circle/discuss/01LUak/":
    "https://leetcode.cn/discuss/post/3581143/fen-xiang-gun-ti-dan-tu-lun-suan-fa-dfsb-qyux/",
  "https://leetcode.cn/circle/discuss/dHn9Vk/":
    "https://leetcode.cn/discuss/post/3580371/fen-xiang-gun-ti-dan-wei-yun-suan-ji-chu-nth4/",
  "https://leetcode.cn/circle/discuss/YiXPXW/":
    "https://leetcode.cn/discuss/post/3580195/fen-xiang-gun-ti-dan-wang-ge-tu-dfsbfszo-l3pa/",
  "https://leetcode.cn/circle/discuss/9oZFK9/":
    "https://leetcode.cn/discuss/post/3579480/ti-dan-dan-diao-zhan-ju-xing-xi-lie-zi-d-u4hk/",
  "https://leetcode.cn/circle/discuss/SqopEo/":
    "https://leetcode.cn/discuss/post/3579164/ti-dan-er-fen-suan-fa-er-fen-da-an-zui-x-3rqn/",
  "https://leetcode.cn/circle/discuss/0viNMK/":
    "https://leetcode.cn/discuss/post/3578981/ti-dan-hua-dong-chuang-kou-ding-chang-bu-rzz7/",
  "https://leetcode.cn/circle/discuss/g6KTKL/":
    "https://leetcode.cn/discuss/post/3091107/fen-xiang-gun-ti-dan-tan-xin-ji-ben-tan-k58yb/",
  "https://leetcode.cn/circle/discuss/K0n2gO/":
    "https://leetcode.cn/discuss/post/3142882/fen-xiang-gun-ti-dan-lian-biao-er-cha-sh-6srp/",
  "https://leetcode.cn/circle/discuss/SJFwQI/":
    "https://leetcode.cn/discuss/post/3144832/fen-xiang-gun-ti-dan-zi-fu-chuan-kmpzhan-ugt4/",
};

function getTopicID(url) {
  try {
    let s = url;
    if (url.indexOf("post") != -1) {
      let ss = url.split("post");
      s = ss[ss.length - 1];
    }
    return s.match(/\d+/)[0];
  } catch (e) {
    return "";
  }
}
const sleep = async (time = 500) =>
  new Promise((resolove) => setTimeout(resolove, time));

async function getRating() {
  return fetch(
    "https://raw.githubusercontent.com/zerotrac/leetcode_problem_rating/main/data.json",
    {
      method: "get",
      mode: "cors",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    }
  ).then((res) => res.json());
}

async function leetcodePOST(json_str) {
  return fetch("https://leetcode.cn/graphql/", {
    method: "POST",
    mode: "cors",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
    body: JSON.stringify(json_str),
  }).then((res) => res.json());
}

async function get_topic(topicId) {
  let json_data = {
    query:
      "\n    query discussPostDetail($uuid: ID, $topicId: ID) {\n  qaQuestion(uuid: $uuid, topicId: $topicId) {\n    topicId\n    ipRegion\n    uuid\n    slug\n    title\n    thumbnail\n    summary\n    content\n    slateValue\n    sunk\n    pinned\n    pinnedGlobally\n    byLeetcode\n    isRecommended\n    isRecommendedGlobally\n    subscribed\n    hitCount\n    numAnswers\n    numPeopleInvolved\n    numSubscribed\n    createdAt\n    updatedAt\n    status\n    identifier\n    resourceType\n    articleType\n    alwaysShow\n    alwaysExpand\n    score\n    favoriteCount\n    isMyFavorite\n    isAnonymous\n    isOwner\n    canEdit\n    canSee\n    reactionType\n    atQuestionTitleSlug\n    blockComments\n    manualRate\n    reactionsV2 {\n      count\n      reactionType\n    }\n    tags {\n      name\n      nameTranslated\n      slug\n      imgUrl\n      tagType\n    }\n    subject {\n      slug\n      title\n    }\n    contentAuthor {\n      username\n      userSlug\n      realName\n      avatar\n      certificationLevel\n    }\n    realAuthor {\n      username\n      profile {\n        userSlug\n        realName\n        userAvatar\n      }\n      certificationLevel\n    }\n    myAnswerId\n  }\n}\n    ",
    variables: { topicId: topicId },
    operationName: "discussPostDetail",
  };

  return leetcodePOST(json_data);
}

const getTitleSlug = (url) => {
  try {
    url = url.replace("https://leetcode.cn/problems/", "");
    let ss = url.split("/");
    return ss[0];
  } catch (e) {
    return "";
  }
};

async function fetchAndProcessData(ratingMap, html, info) {
  try {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const contentElement = document;
    if (!contentElement) {
      throw new Error("Could not find .break-words element in the page");
    }

    const allLinks = Array.from(contentElement.querySelectorAll("a"));

    const isProblems = (url) =>
      url && url.startsWith("https://leetcode.cn/problems/");
    const isMember = (txt) => txt && txt.indexOf("会员题") !== -1;

    let problems = [];
    for (let i = 0; i < allLinks.length; i++) {
      if (allLinks[i].href && isProblems(allLinks[i].href)) {
        let link = allLinks[i];
        let titleSlug = getTitleSlug(link.href);
        if (!titleSlug) continue;

        problems.push({
          title: link.textContent.trim(),
          url: link.href,
          member: isMember(link?.parentNode?.textContent),
          score: ratingMap.get(titleSlug) || 0,
          titleSlug: titleSlug,
        });
      }
    }

    const result = {
      title: info.title,
      problemUrl: info.link,
      createTime: new Date().toLocaleString(),
      problems: problems,
    };
    return result;
  } catch (error) {
    console.error("Error:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }
    return null;
  }
}

function createBackMap(FILE_PATH) {
  if (!fs.existsSync(FILE_PATH)) {
    return new Map();
  }

  try {
    const fileContent = fs.readFileSync(FILE_PATH, "utf8");
    const back = JSON.parse(fileContent);
    if (!Array.isArray(back)) {
      throw new Error(`文件 ${FILE_PATH} 内容不是有效的JSON数组`);
    }
    const backMap = new Map();
    for (const info of back) {
      if (info && info.problemUrl) {
        backMap.set(info.problemUrl, info);
      }
    }

    return backMap;
  } catch (error) {
    console.error(`处理文件 ${FILE_PATH} 时出错:`, error.message);
    return new Map();
  }
}


// old
function save_old_problems(results) {
  let newMap = new Map()
  for(let k in old_url_map) {
    newMap.set(old_url_map[k],k)
  }
  for(let i = 0;i< results.length;i++) {
    results[i].problemUrl = newMap.get(results[i].problemUrl)
  }
  fs.writeFileSync(OLD_FILE_PATH, JSON.stringify(results, null, 2));
}


async function start() {
  const backMap = createBackMap(FILE_PATH);
  console.log("备份的题单数量:", backMap.size);
  let ratingData = await getRating();

  const ratingMap = new Map();
  for (const info of ratingData) {
    ratingMap.set(info.TitleSlug, parseInt(info.Rating));
  }

  let results = [];
  for (let info of defaultUrls) {
    console.log("开始解析题单 : ", info.title);
    try {
      await sleep(1000);
      let data = await get_topic(getTopicID(info.link));
      let html = marked.parse(data.data.qaQuestion.content);
      let res = await fetchAndProcessData(ratingMap, html, info);
      results.push(res);
    } catch (e) {
      console.error(
        "解析失败:",
        info.title,
        "该部分将使用旧版本",
        "错误原因:",
        e
      );
      if (backMap.has(info.link)) {
        results.push(backMap.get(info.link));
      } else {
        return;
      }
    }
  }
  
  if (FILE_PATH && results.length == defaultUrls.length) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(results, null, 2));
    fs.writeFileSync(DATA, JSON.stringify(ratingData, null, 2));
    save_old_problems(results)
    console.log("更新完成！结果已保存到:" + FILE_PATH);
  }
}




start();

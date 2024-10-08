
查询接口均为 `https://leetcode.cn/graphql/`


### 单个题目状态查询


查询内容

```json
{
    "query": "\n    query userQuestionStatus($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    status\n  }\n}\n    ",
    "variables": {
      "titleSlug": "count-number-of-texts"
    },
    "operationName": "userQuestionStatus"
  }


```

查询结果

> 通过

```json
{"data":{"question":{"status":"ac"}}}
```

> 尝试过

```json
{"data":{"question":{"status":"notac"}}}
```


> 没做过

```json
{"data":{"question":{"status":null}}}
```

### 分页批量查询

```json
{
    "query": "\n    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {\n  problemsetQuestionList(\n    categorySlug: $categorySlug\n    limit: $limit\n    skip: $skip\n    filters: $filters\n  ) {\n    hasMore\n    total\n    questions {\n      acRate\n      difficulty\n      freqBar\n      frontendQuestionId\n      isFavor\n      paidOnly\n      solutionNum\n      status\n      title\n      titleCn\n      titleSlug\n      topicTags {\n        name\n        nameTranslated\n        id\n        slug\n      }\n      extra {\n        hasVideoSolution\n        topCompanyTags {\n          imgUrl\n          slug\n          numSubscribed\n        }\n      }\n    }\n  }\n}\n    ",
    "variables": {
        "categorySlug": "all-code-essentials",
        "skip": 0,
        "limit": 100,
        "filters": {}
    },
    "operationName": "problemsetQuestionList"
}

```


查询结果 显示为 [] 

AC状态 ` status:AC `：

```json
 {
                    "__typename": "QuestionLightNode",
                    "acRate": 0.60032651186608,
                    "difficulty": "MEDIUM",
                    "freqBar": 0,
                    "paidOnly": false,
                    "status": "AC",
                    "frontendQuestionId": "17",
                    "isFavor": false,
                    "solutionNum": 6497,
                    "title": "Letter Combinations of a Phone Number",
                    "titleCn": "\u7535\u8bdd\u53f7\u7801\u7684\u5b57\u6bcd\u7ec4\u5408",
                    "titleSlug": "letter-combinations-of-a-phone-number",
                    "topicTags": [
                        {
                            "id": "wzve3",
                            "name": "Hash Table",
                            "slug": "hash-table",
                            "nameTranslated": "\u54c8\u5e0c\u8868",
                            "__typename": "CommonTagNode"
                        },
                        {
                            "id": "dofid",
                            "name": "String",
                            "slug": "string",
                            "nameTranslated": "\u5b57\u7b26\u4e32",
                            "__typename": "CommonTagNode"
                        },
                        {
                            "id": "dnl25",
                            "name": "Backtracking",
                            "slug": "backtracking",
                            "nameTranslated": "\u56de\u6eaf",
                            "__typename": "CommonTagNode"
                        }
                    ],
                    "extra": {
                        "companyTagNum": 114,
                        "hasVideoSolution": true,
                        "topCompanyTags": [
                            {
                                "imgUrl": "https://assets.leetcode-cn.com/aliyun-lc-upload/uploaded_files/2022/09/e9108030-576a-4a77-8539-75de09ce5a5a/%E5%85%AC%E5%8F%B8%20Logo%E7%9A%84%E5%89%AF%E6%9C%AC.png",
                                "slug": "amazon",
                                "__typename": "CommonTagNode"
                            },
                            {
                                "imgUrl": "https://pic.leetcode.cn/1708937184-xVvbWK-u=2159681834,500194647&fm=253&fmt=auto&app=138&f=JPEG.webp",
                                "slug": "facebook",
                                "__typename": "CommonTagNode"
                            },
                            {
                                "imgUrl": "https://pic.leetcode-cn.com/dc8ca8220e0392cd08f0832bf03d6df599fa081505f307f09fdc91139aa4b54b-c0c9bfecd0329eeeaee48437456956fea5fcb84185f37de7656eabfe54c595e1-unnamed-1.png",
                                "slug": "microsoft",
                                "__typename": "CommonTagNode"
                            }
                        ],
                        "__typename": "QuestionExtraInfoNode"
                    }
                },

```



> 尝试过状态 ` "status": "TRIED" `


完全信息

```json
 {
                    "__typename": "QuestionLightNode",
                    "acRate": 0.5429598726823806,
                    "difficulty": "HARD",
                    "freqBar": 0,
                    "paidOnly": false,
                    "status": "TRIED",
                    "frontendQuestionId": "68",
                    "isFavor": false,
                    "solutionNum": 1079,
                    "title": "Text Justification",
                    "titleCn": "\u6587\u672c\u5de6\u53f3\u5bf9\u9f50",
                    "titleSlug": "text-justification",
                    "topicTags": [
                        {
                            "id": "wg0rh",
                            "name": "Array",
                            "slug": "array",
                            "nameTranslated": "\u6570\u7ec4",
                            "__typename": "CommonTagNode"
                        },
                        {
                            "id": "dofid",
                            "name": "String",
                            "slug": "string",
                            "nameTranslated": "\u5b57\u7b26\u4e32",
                            "__typename": "CommonTagNode"
                        },
                        {
                            "id": "xeyjfe6",
                            "name": "Simulation",
                            "slug": "simulation",
                            "nameTranslated": "\u6a21\u62df",
                            "__typename": "CommonTagNode"
                        }
                    ],
                    "extra": {
                        "companyTagNum": 66,
                        "hasVideoSolution": false,
                        "topCompanyTags": [
                            {
                                "imgUrl": "https://pic.leetcode-cn.com/45a64add888e66ff6d3c551bed948528715996937b877aaf6fdc08eae74789f5-google-logo-png-open-2000.png",
                                "slug": "google",
                                "__typename": "CommonTagNode"
                            },
                            {
                                "imgUrl": "https://pic.leetcode.cn/1708937102-GxHGgg-Unknown-3.jpeg",
                                "slug": "linkedin",
                                "__typename": "CommonTagNode"
                            },
                            {
                                "imgUrl": "https://assets.leetcode-cn.com/aliyun-lc-upload/tag/%E4%BC%98%E6%AD%A5%20%28Uber%29/company_logo",
                                "slug": "uber",
                                "__typename": "CommonTagNode"
                            }
                        ],
                        "__typename": "QuestionExtraInfoNode"
                    }
                },

```

> 没做过 ` "status": "NOT_STARTED" `

完全信息

```json
 {
                    "__typename": "QuestionLightNode",
                    "acRate": 0.5523393289242425,
                    "difficulty": "HARD",
                    "freqBar": 0,
                    "paidOnly": false,
                    "status": "NOT_STARTED",
                    "frontendQuestionId": "85",
                    "isFavor": false,
                    "solutionNum": 1301,
                    "title": "Maximal Rectangle",
                    "titleCn": "\u6700\u5927\u77e9\u5f62",
                    "titleSlug": "maximal-rectangle",
                    "topicTags": [
                        {
                            "id": "nn04j",
                            "name": "Stack",
                            "slug": "stack",
                            "nameTranslated": "\u6808",
                            "__typename": "CommonTagNode"
                        },
                        {
                            "id": "wg0rh",
                            "name": "Array",
                            "slug": "array",
                            "nameTranslated": "\u6570\u7ec4",
                            "__typename": "CommonTagNode"
                        },
                        {
                            "id": "d2tn7",
                            "name": "Dynamic Programming",
                            "slug": "dynamic-programming",
                            "nameTranslated": "\u52a8\u6001\u89c4\u5212",
                            "__typename": "CommonTagNode"
                        },
                        {
                            "id": "uw538v",
                            "name": "Matrix",
                            "slug": "matrix",
                            "nameTranslated": "\u77e9\u9635",
                            "__typename": "CommonTagNode"
                        },
                        {
                            "id": "xeyj5r5",
                            "name": "Monotonic Stack",
                            "slug": "monotonic-stack",
                            "nameTranslated": "\u5355\u8c03\u6808",
                            "__typename": "CommonTagNode"
                        }
                    ],
                    "extra": {
                        "companyTagNum": 90,
                        "hasVideoSolution": true,
                        "topCompanyTags": [
                            {
                                "imgUrl": "https://pic.leetcode-cn.com/45a64add888e66ff6d3c551bed948528715996937b877aaf6fdc08eae74789f5-google-logo-png-open-2000.png",
                                "slug": "google",
                                "__typename": "CommonTagNode"
                            },
                            {
                                "imgUrl": "https://assets.leetcode-cn.com/aliyun-lc-upload/uploaded_files/2022/09/e9108030-576a-4a77-8539-75de09ce5a5a/%E5%85%AC%E5%8F%B8%20Logo%E7%9A%84%E5%89%AF%E6%9C%AC.png",
                                "slug": "amazon",
                                "__typename": "CommonTagNode"
                            },
                            {
                                "imgUrl": "https://pic.leetcode-cn.com/1608896124-NAAKhT-images.png",
                                "slug": "bytedance",
                                "__typename": "CommonTagNode"
                            }
                        ],
                        "__typename": "QuestionExtraInfoNode"
                    }
                },

```



### 题单计划查询


查询条件 

example : top-100-liked

```json
{
    "query": "\n    query studyPlanPastSolved($slug: String!) {\n  studyPlanV2Detail(planSlug: $slug) {\n    planSubGroups {\n      slug\n      questions {\n        titleSlug\n        status\n      }\n    }\n  }\n}\n    ",
    "variables": {
        "slug": "top-100-liked"
    },
    "operationName": "studyPlanPastSolved"
}
```

查询结果

```txt

计划 通过

"status": "SOLVED"

通过

"status": "PAST_SOLVED"

```

```json


{
    "data": {
        "studyPlanV2Detail": {
            "planSubGroups": [
                {
                    "slug": "top-100-liked-80-r32o",
                    "questions": [
                        {
                            "titleSlug": "two-sum",
                            "status": "SOLVED"
                        },
                        {
                            "titleSlug": "group-anagrams",
                            "status": "PAST_SOLVED"
                        },
                        {
                            "titleSlug": "longest-consecutive-sequence",
                            "status": "PAST_SOLVED"
                        }
                    ]
                },

                // ...

            ]
        }
    }
}

```



## 补充接口


> 获取题目元信息


接口

url : https://leetcode.cn/graphql/
方式 ：method
负载 ：
```json
{
    "query": "\n    query consolePanelConfig($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    questionTitle\n    enableRunCode\n    enableSubmit\n    enableTestMode\n    jsonExampleTestcases\n    exampleTestcases\n    metaData\n    sampleTestCase\n  }\n}\n    ",
    "variables": {
        "titleSlug": "minimum-number-of-refueling-stops"
    },
    "operationName": "consolePanelConfig"
}
```


结果

```json
{
    "data": {
        "question": {
            "questionId": "902",
            "questionFrontendId": "871",
            "questionTitle": "Minimum Number of Refueling Stops",
            "enableRunCode": true,
            "enableSubmit": true,
            "enableTestMode": false,
            "jsonExampleTestcases": "[\"1\\n1\\n[]\", \"100\\n1\\n[[10,100]]\", \"100\\n10\\n[[10,60],[20,30],[30,30],[60,40]]\"]",
            "exampleTestcases": "1\n1\n[]\n100\n1\n[[10,100]]\n100\n10\n[[10,60],[20,30],[30,30],[60,40]]",
            "metaData": "{\r\n  \"name\": \"minRefuelStops\",\r\n  \"params\": [\r\n    {\r\n      \"name\": \"target\",\r\n      \"type\": \"integer\"\r\n    },\r\n    {\r\n      \"name\": \"startFuel\",\r\n      \"type\": \"integer\"\r\n    },\r\n    {\r\n      \"name\": \"stations\",\r\n      \"type\": \"integer[][]\"\r\n    }\r\n  ],\r\n  \"return\": {\r\n    \"type\": \"integer\"\r\n  }\r\n}\r\n",
            "sampleTestCase": "1\n1\n[]"
        }
    }
}
```
> 获取题目信息


接口

url : https://leetcode.cn/graphql/
方式 ：method
负载 ：
```json
{
    "query": "\n    query questionTranslations($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    translatedTitle\n    translatedContent\n  }\n}\n    ",
    "variables": {
        "titleSlug": "minimum-number-of-refueling-stops"
    },
    "operationName": "questionTranslations"
}
```


结果

```json
{
    "data": {
        "question": {
            "translatedTitle": "最低加油次数",
            "translatedContent": "<p>汽车从起点出发驶向目的地，该目的地位于出发位置东面 <code>target</code>&nbsp;英里处。</p>\n\n<p>沿途有加油站，用数组&nbsp;<code>stations</code> 表示。其中 <code>stations[i] = [position<sub>i</sub>, fuel<sub>i</sub>]</code> 表示第 <code>i</code> 个加油站位于出发位置东面&nbsp;<code>position<sub>i</sub></code> 英里处，并且有&nbsp;<code>fuel<sub>i</sub></code>&nbsp;升汽油。</p>\n\n<p>假设汽车油箱的容量是无限的，其中最初有&nbsp;<code>startFuel</code>&nbsp;升燃料。它每行驶 1 英里就会用掉 1 升汽油。当汽车到达加油站时，它可能停下来加油，将所有汽油从加油站转移到汽车中。</p>\n\n<p>为了到达目的地，汽车所必要的最低加油次数是多少？如果无法到达目的地，则返回 <code>-1</code> 。</p>\n\n<p>注意：如果汽车到达加油站时剩余燃料为 <code>0</code>，它仍然可以在那里加油。如果汽车到达目的地时剩余燃料为 <code>0</code>，仍然认为它已经到达目的地。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>target = 1, startFuel = 1, stations = []\n<strong>输出：</strong>0\n<strong>解释：</strong>可以在不加油的情况下到达目的地。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>target = 100, startFuel = 1, stations = [[10,100]]\n<strong>输出：</strong>-1\n<strong>解释：</strong>无法抵达目的地，甚至无法到达第一个加油站。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]\n<strong>输出：</strong>2\n<strong>解释：</strong>\n出发时有 10 升燃料。\n开车来到距起点 10 英里处的加油站，消耗 10 升燃料。将汽油从 0 升加到 60 升。\n然后，从 10 英里处的加油站开到 60 英里处的加油站（消耗 50 升燃料），\n并将汽油从 10 升加到 50 升。然后开车抵达目的地。\n沿途在两个加油站停靠，所以返回 2 。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= target, startFuel &lt;= 10<sup>9</sup></code></li>\n\t<li><code>0 &lt;= stations.length &lt;= 500</code></li>\n\t<li><code>1 &lt;= position<sub>i</sub> &lt; position<sub>i+1</sub> &lt; target</code></li>\n\t<li><code>1 &lt;= fuel<sub>i</sub> &lt; 10<sup>9</sup></code></li>\n</ul>\n"
        }
    }
}
```

> 获取代码块信息 

url : https://leetcode.cn/graphql/
方式 ：method
负载 ：
```json
{
    "query": "\n    query questionEditorData($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    codeSnippets {\n      lang\n      langSlug\n      code\n    }\n    envInfo\n    enableRunCode\n    hasFrontendPreview\n    frontendPreviews\n  }\n}\n    ",
    "variables": {
        "titleSlug": "minimum-number-of-refueling-stops"
    },
    "operationName": "questionEditorData"
}
```


结果

```json
{
    "data": {
        "question": {
            "questionId": "902",
            "questionFrontendId": "871",
            "codeSnippets": [
                {
                    "lang": "C++",
                    "langSlug": "cpp",
                    "code": "class Solution {\npublic:\n    int minRefuelStops(int target, int startFuel, vector<vector<int>>& stations) {\n\n    }\n};"
                },
                {
                    "lang": "Java",
                    "langSlug": "java",
                    "code": "class Solution {\n    public int minRefuelStops(int target, int startFuel, int[][] stations) {\n\n    }\n}"
                },
                {
                    "lang": "Python",
                    "langSlug": "python",
                    "code": "class Solution(object):\n    def minRefuelStops(self, target, startFuel, stations):\n        \"\"\"\n        :type target: int\n        :type startFuel: int\n        :type stations: List[List[int]]\n        :rtype: int\n        \"\"\""
                },
                {
                    "lang": "Python3",
                    "langSlug": "python3",
                    "code": "class Solution:\n    def minRefuelStops(self, target: int, startFuel: int, stations: List[List[int]]) -> int:"
                },
                {
                    "lang": "C",
                    "langSlug": "c",
                    "code": "int minRefuelStops(int target, int startFuel, int** stations, int stationsSize, int* stationsColSize) {\n    \n}"
                },
                {
                    "lang": "C#",
                    "langSlug": "csharp",
                    "code": "public class Solution {\n    public int MinRefuelStops(int target, int startFuel, int[][] stations) {\n\n    }\n}"
                },
                {
                    "lang": "JavaScript",
                    "langSlug": "javascript",
                    "code": "/**\n * @param {number} target\n * @param {number} startFuel\n * @param {number[][]} stations\n * @return {number}\n */\nvar minRefuelStops = function(target, startFuel, stations) {\n\n};"
                },
                {
                    "lang": "TypeScript",
                    "langSlug": "typescript",
                    "code": "function minRefuelStops(target: number, startFuel: number, stations: number[][]): number {\n    \n};"
                },
                {
                    "lang": "PHP",
                    "langSlug": "php",
                    "code": "class Solution {\n\n    /**\n     * @param Integer $target\n     * @param Integer $startFuel\n     * @param Integer[][] $stations\n     * @return Integer\n     */\n    function minRefuelStops($target, $startFuel, $stations) {\n\n    }\n}"
                },
                {
                    "lang": "Swift",
                    "langSlug": "swift",
                    "code": "class Solution {\n    func minRefuelStops(_ target: Int, _ startFuel: Int, _ stations: [[Int]]) -> Int {\n\n    }\n}"
                },
                {
                    "lang": "Kotlin",
                    "langSlug": "kotlin",
                    "code": "class Solution {\n    fun minRefuelStops(target: Int, startFuel: Int, stations: Array<IntArray>): Int {\n\n    }\n}"
                },
                {
                    "lang": "Dart",
                    "langSlug": "dart",
                    "code": "class Solution {\n  int minRefuelStops(int target, int startFuel, List<List<int>> stations) {\n    \n  }\n}"
                },
                {
                    "lang": "Go",
                    "langSlug": "golang",
                    "code": "func minRefuelStops(target int, startFuel int, stations [][]int) int {\n\n}"
                },
                {
                    "lang": "Ruby",
                    "langSlug": "ruby",
                    "code": "# @param {Integer} target\n# @param {Integer} start_fuel\n# @param {Integer[][]} stations\n# @return {Integer}\ndef min_refuel_stops(target, start_fuel, stations)\n    \nend"
                },
                {
                    "lang": "Scala",
                    "langSlug": "scala",
                    "code": "object Solution {\n    def minRefuelStops(target: Int, startFuel: Int, stations: Array[Array[Int]]): Int = {\n        \n    }\n}"
                },
                {
                    "lang": "Rust",
                    "langSlug": "rust",
                    "code": "impl Solution {\n    pub fn min_refuel_stops(target: i32, start_fuel: i32, stations: Vec<Vec<i32>>) -> i32 {\n\n    }\n}"
                },
                {
                    "lang": "Racket",
                    "langSlug": "racket",
                    "code": "(define/contract (min-refuel-stops target startFuel stations)\n  (-> exact-integer? exact-integer? (listof (listof exact-integer?)) exact-integer?)\n  )"
                },
                {
                    "lang": "Erlang",
                    "langSlug": "erlang",
                    "code": "-spec min_refuel_stops(Target :: integer(), StartFuel :: integer(), Stations :: [[integer()]]) -> integer().\nmin_refuel_stops(Target, StartFuel, Stations) ->\n  ."
                },
                {
                    "lang": "Elixir",
                    "langSlug": "elixir",
                    "code": "defmodule Solution do\n  @spec min_refuel_stops(target :: integer, start_fuel :: integer, stations :: [[integer]]) :: integer\n  def min_refuel_stops(target, start_fuel, stations) do\n    \n  end\nend"
                },
                {
                    "lang": "Cangjie",
                    "langSlug": "cangjie",
                    "code": "class Solution {\n    func minRefuelStops(target: Int64, startFuel: Int64, stations: Array<Array<Int64>>): Int64 {\n\n    }\n}"
                }
            ],
            "envInfo": "{\"cpp\":[\"C++\",\"<p>\\u7248\\u672c\\uff1a<code>clang 17<\\/code> \\u91c7\\u7528\\u6700\\u65b0 C++ 23 \\u6807\\u51c6\\uff0c\\u5e76\\u4f7f\\u7528 GCC 13 \\u63d0\\u4f9b\\u7684 <code>libstdc++<\\/code>\\u3002<\\/p>\\r\\n\\r\\n<p>\\u7f16\\u8bd1\\u65f6\\uff0c\\u5c06\\u4f1a\\u91c7\\u7528 <code>-O2<\\/code> \\u7ea7\\u4f18\\u5316\\uff0c\\u5e76\\u63d0\\u4f9b <code>-gline-tables-only<\\/code> \\u53c2\\u6570\\u3002<a href=\\\"https:\\/\\/github.com\\/google\\/sanitizers\\/wiki\\/AddressSanitizer\\\" target=\\\"_blank\\\">AddressSanitizer<\\/a> \\u4e5f\\u88ab\\u5f00\\u542f\\u6765\\u68c0\\u6d4b <code>out-of-bounds<\\/code> \\u548c <code>use-after-free<\\/code> \\u9519\\u8bef\\u3002<\\/p>\\r\\n\\r\\n<p>\\u4e3a\\u4e86\\u4f7f\\u7528\\u65b9\\u4fbf\\uff0c\\u5927\\u90e8\\u5206\\u6807\\u51c6\\u5e93\\u7684\\u5934\\u6587\\u4ef6\\u5df2\\u7ecf\\u88ab\\u81ea\\u52a8\\u5bfc\\u5165\\u3002<\\/p>\"],\"java\":[\"Java\",\"<p>\\u7248\\u672c\\uff1a<code>OpenJDK 21<\\/code>\\u3002\\u4f7f\\u7528\\u7f16\\u8bd1\\u53c2\\u6570 <code>--enable-preview --release 21<\\/code><\\/p>\\r\\n\\r\\n<p>\\u4e3a\\u4e86\\u65b9\\u4fbf\\u8d77\\u89c1\\uff0c\\u5927\\u90e8\\u5206\\u6807\\u51c6\\u5e93\\u7684\\u5934\\u6587\\u4ef6\\u5df2\\u88ab\\u5bfc\\u5165\\u3002<\\/p>\\r\\n\\r\\n<p>\\u5305\\u542b Pair \\u7c7b: https:\\/\\/docs.oracle.com\\/javase\\/8\\/javafx\\/api\\/javafx\\/util\\/Pair.html <\\/p>\"],\"python\":[\"Python\",\"<p>\\u7248\\u672c\\uff1a <code>Python 2.7.12<\\/code><\\/p>\\r\\n\\r\\n<p>\\u4e3a\\u4e86\\u65b9\\u4fbf\\u8d77\\u89c1\\uff0c\\u5927\\u90e8\\u5206\\u5e38\\u7528\\u5e93\\u5df2\\u7ecf\\u88ab\\u81ea\\u52a8 \\u5bfc\\u5165\\uff0c\\u5982\\uff1a<a href=\\\"https:\\/\\/docs.python.org\\/2\\/library\\/array.html\\\" target=\\\"_blank\\\">array<\\/a>, <a href=\\\"https:\\/\\/docs.python.org\\/2\\/library\\/bisect.html\\\" target=\\\"_blank\\\">bisect<\\/a>, <a href=\\\"https:\\/\\/docs.python.org\\/2\\/library\\/collections.html\\\" target=\\\"_blank\\\">collections<\\/a>\\u3002\\u5982\\u679c\\u60a8\\u9700\\u8981\\u4f7f\\u7528\\u5176\\u4ed6\\u5e93\\u51fd\\u6570\\uff0c\\u8bf7\\u81ea\\u884c\\u5bfc\\u5165\\u3002<\\/p>\\r\\n\\r\\n<p>\\u6ce8\\u610f Python 2.7 <a href=\\\"https:\\/\\/www.python.org\\/dev\\/peps\\/pep-0373\\/\\\" target=\\\"_blank\\\">\\u5c06\\u57282020\\u5e74\\u540e\\u4e0d\\u518d\\u7ef4\\u62a4<\\/a>\\u3002 \\u5982\\u60f3\\u4f7f\\u7528\\u6700\\u65b0\\u7248\\u7684Python\\uff0c\\u8bf7\\u9009\\u62e9Python 3\\u3002<\\/p>\"],\"c\":[\"C\",\"<p>\\u7248\\u672c\\uff1a<code>GCC 13<\\/code>\\uff0c\\u91c7\\u7528 GNU11 \\u6807\\u51c6\\u3002<\\/p>\\r\\n\\r\\n<p>\\u7f16\\u8bd1\\u65f6\\uff0c\\u5c06\\u4f1a\\u91c7\\u7528 <code>-O2<\\/code> \\u7ea7\\u4f18\\u5316\\uff0c\\u5e76\\u63d0\\u4f9b <code>-g1<\\/code> \\u53c2\\u6570\\u3002 <a href=\\\"https:\\/\\/github.com\\/google\\/sanitizers\\/wiki\\/AddressSanitizer\\\" target=\\\"_blank\\\">AddressSanitizer<\\/a> \\u4e5f\\u88ab\\u5f00\\u542f\\u6765\\u68c0\\u6d4b <code>out-of-bounds<\\/code> \\u548c <code>use-after-free<\\/code> \\u9519\\u8bef\\u3002<\\/p>\\r\\n\\r\\n<p>\\u4e3a\\u4e86\\u4f7f\\u7528\\u65b9\\u4fbf\\uff0c\\u5927\\u90e8\\u5206\\u6807\\u51c6\\u5e93\\u7684\\u5934\\u6587\\u4ef6\\u5df2\\u7ecf\\u88ab\\u81ea\\u52a8\\u5bfc\\u5165\\u3002<\\/p>\\r\\n\\r\\n<p>\\u5982\\u60f3\\u4f7f\\u7528\\u54c8\\u5e0c\\u8868\\u8fd0\\u7b97, \\u60a8\\u53ef\\u4ee5\\u4f7f\\u7528 <a href=\\\"https:\\/\\/troydhanson.github.io\\/uthash\\/\\\" target=\\\"_blank\\\">uthash<\\/a>\\u3002 \\\"uthash.h\\\"\\u5df2\\u7ecf\\u9ed8\\u8ba4\\u88ab\\u5bfc\\u5165\\u3002\\u8bf7\\u770b\\u5982\\u4e0b\\u793a\\u4f8b:<\\/p>\\r\\n\\r\\n<p><b>1. \\u5f80\\u54c8\\u5e0c\\u8868\\u4e2d\\u6dfb\\u52a0\\u4e00\\u4e2a\\u5bf9\\u8c61\\uff1a<\\/b>\\r\\n<pre>\\r\\nstruct hash_entry {\\r\\n    int id;            \\/* we'll use this field as the key *\\/\\r\\n    char name[10];\\r\\n    UT_hash_handle hh; \\/* makes this structure hashable *\\/\\r\\n};\\r\\n\\r\\nstruct hash_entry *users = NULL;\\r\\n\\r\\nvoid add_user(struct hash_entry *s) {\\r\\n    HASH_ADD_INT(users, id, s);\\r\\n}\\r\\n<\\/pre>\\r\\n<\\/p>\\r\\n\\r\\n<p><b>2. \\u5728\\u54c8\\u5e0c\\u8868\\u4e2d\\u67e5\\u627e\\u4e00\\u4e2a\\u5bf9\\u8c61\\uff1a<\\/b>\\r\\n<pre>\\r\\nstruct hash_entry *find_user(int user_id) {\\r\\n    struct hash_entry *s;\\r\\n    HASH_FIND_INT(users, &user_id, s);\\r\\n    return s;\\r\\n}\\r\\n<\\/pre>\\r\\n<\\/p>\\r\\n\\r\\n<p><b>3. \\u4ece\\u54c8\\u5e0c\\u8868\\u4e2d\\u5220\\u9664\\u4e00\\u4e2a\\u5bf9\\u8c61\\uff1a<\\/b>\\r\\n<pre>\\r\\nvoid delete_user(struct hash_entry *user) {\\r\\n    HASH_DEL(users, user);  \\r\\n}\\r\\n<\\/pre>\\r\\n<\\/p>\"],\"csharp\":[\"C#\",\"<p><a href=\\\"https:\\/\\/learn.microsoft.com\\/en-us\\/dotnet\\/csharp\\/whats-new\\/csharp-12\\\" target=\\\"_blank\\\">C# 12<\\/a> \\u8fd0\\u884c\\u5728 .NET 8 \\u4e0a<\\/p>\"],\"javascript\":[\"JavaScript\",\"<p>\\u7248\\u672c\\uff1a<code>Node.js 20.10.0<\\/code><\\/p>\\r\\n\\r\\n<p>\\u60a8\\u7684\\u4ee3\\u7801\\u5728\\u6267\\u884c\\u65f6\\u5c06\\u5e26\\u4e0a <code>--harmony<\\/code> \\u6807\\u8bb0\\u6765\\u5f00\\u542f <a href=\\\"http:\\/\\/node.green\\/\\\" target=\\\"_blank\\\">\\u65b0\\u7248ES6\\u7279\\u6027<\\/a>\\u3002<\\/p>\\r\\n\\r\\n<p><a href=\\\"https:\\/\\/lodash.com\\\" target=\\\"_blank\\\">lodash.js<\\/a> \\u5e93\\u5df2\\u7ecf\\u9ed8\\u8ba4\\u88ab\\u5305\\u542b\\u3002<\\/p>\\r\\n\\r\\n<p> \\u5982\\u9700\\u4f7f\\u7528\\u961f\\u5217\\/\\u4f18\\u5148\\u961f\\u5217\\uff0c\\u60a8\\u53ef\\u4f7f\\u7528 <a href=\\\"https:\\/\\/github.com\\/datastructures-js\\/priority-queue\\/blob\\/v5\\/README.md\\\" target=\\\"_blank\\\"> datastructures-js\\/priority-queue@5.4.0<\\/a>\\uff0c<a href=\\\"https:\\/\\/github.com\\/datastructures-js\\/queue\\/tree\\/v4.2.3\\\" target=\\\"_blank\\\"> datastructures-js\\/queue@4.2.3<\\/a> \\u4ee5\\u53ca <a href=\\\"https:\\/\\/github.com\\/datastructures-js\\/deque\\/tree\\/v1.0.4\\\" target=\\\"_blank\\\"> datastructures-js\\/deque@1.0.4<\\/a>\\u3002<\\/p>\"],\"ruby\":[\"Ruby\",\"<p>\\u4f7f\\u7528 <code>Ruby 3.2<\\/code> \\u6267\\u884c<\\/p>\\r\\n\\r\\n<p>\\u4e00\\u4e9b\\u5e38\\u7528\\u7684\\u6570\\u636e\\u7ed3\\u6784\\u5df2\\u5728 Algorithms \\u6a21\\u5757\\u4e2d\\u63d0\\u4f9b\\uff1ahttps:\\/\\/www.rubydoc.info\\/github\\/kanwei\\/algorithms\\/Algorithms<\\/p>\"],\"swift\":[\"Swift\",\"<p>\\u7248\\u672c\\uff1a<code>Swift 5.10<\\/code><\\/p>\\r\\n\\r\\n<p>\\u60a8\\u53ef\\u4ee5\\u4f7f\\u7528 <a href=\\\"https:\\/\\/github.com\\/apple\\/swift-algorithms\\/tree\\/1.2.0\\\" target=\\\"_blank\\\">swift-algorithms 1.2.0<\\/a> \\u548c <a href=\\\"https:\\/\\/github.com\\/apple\\/swift-collections\\/tree\\/1.1.0\\\" target=\\\"_blank\\\">swift-collections 1.1.0<\\/a><\\/p>\\r\\n\\r\\n<p>\\u6211\\u4eec\\u901a\\u5e38\\u4fdd\\u8bc1\\u66f4\\u65b0\\u5230 <a href=\\\"https:\\/\\/swift.org\\/download\\/\\\" target=\\\"_blank\\\">Apple\\u653e\\u51fa\\u7684\\u6700\\u65b0\\u7248Swift<\\/a>\\u3002\\u5982\\u679c\\u60a8\\u53d1\\u73b0Swift\\u4e0d\\u662f\\u6700\\u65b0\\u7248\\u7684\\uff0c\\u8bf7\\u8054\\u7cfb\\u6211\\u4eec\\uff01\\u6211\\u4eec\\u5c06\\u5c3d\\u5feb\\u66f4\\u65b0\\u3002<\\/p>\"],\"golang\":[\"Go\",\"<p>\\u7248\\u672c\\uff1a<code>Go 1.23<\\/code><\\/p>\\r\\n\\r\\n<p>\\u652f\\u6301 <a href=\\\"https:\\/\\/pkg.go.dev\\/github.com\\/emirpasic\\/gods@v1.18.1\\\" target=\\\"_blank\\\">https:\\/\\/pkg.go.dev\\/github.com\\/emirpasic\\/gods@v1.18.1<\\/a> \\u548c <a href=\\\"https:\\/\\/pkg.go.dev\\/github.com\\/emirpasic\\/gods\\/v2@v2.0.0-alpha\\\" target=\\\"_blank\\\">https:\\/\\/pkg.go.dev\\/github.com\\/emirpasic\\/gods\\/v2@v2.0.0-alpha<\\/a> \\u7b2c\\u4e09\\u65b9\\u5e93\\u3002<\\/p>\"],\"python3\":[\"Python3\",\"<p>\\u7248\\u672c\\uff1a<code>Python 3.11<\\/code><\\/p>\\r\\n\\r\\n<p>\\u4e3a\\u4e86\\u65b9\\u4fbf\\u8d77\\u89c1\\uff0c\\u5927\\u90e8\\u5206\\u5e38\\u7528\\u5e93\\u5df2\\u7ecf\\u88ab\\u81ea\\u52a8 \\u5bfc\\u5165\\uff0c\\u5982<a href=\\\"https:\\/\\/docs.python.org\\/3\\/library\\/array.html\\\" target=\\\"_blank\\\">array<\\/a>, <a href=\\\"https:\\/\\/docs.python.org\\/3\\/library\\/bisect.html\\\" target=\\\"_blank\\\">bisect<\\/a>, <a href=\\\"https:\\/\\/docs.python.org\\/3\\/library\\/collections.html\\\" target=\\\"_blank\\\">collections<\\/a>\\u3002 \\u5982\\u679c\\u60a8\\u9700\\u8981\\u4f7f\\u7528\\u5176\\u4ed6\\u5e93\\u51fd\\u6570\\uff0c\\u8bf7\\u81ea\\u884c\\u5bfc\\u5165\\u3002<\\/p>\\r\\n\\r\\n<p>\\u5982\\u9700\\u4f7f\\u7528 Map\\/TreeMap \\u6570\\u636e\\u7ed3\\u6784\\uff0c\\u60a8\\u53ef\\u4f7f\\u7528 <a href=\\\"http:\\/\\/www.grantjenks.com\\/docs\\/sortedcontainers\\/\\\" target=\\\"_blank\\\">sortedcontainers<\\/a> \\u5e93\\u3002<\\/p>\"],\"scala\":[\"Scala\",\"<p>\\u7248\\u672c\\uff1a<code>Scala 3.3.1<\\/code><\\/p>\"],\"kotlin\":[\"Kotlin\",\"<p>\\u7248\\u672c\\uff1a<code>Kotlin 1.9.0<\\/code><\\/p>\\r\\n\\r\\n<p>\\u6211\\u4eec\\u4f7f\\u7528\\u7684\\u662f JetBrains \\u63d0\\u4f9b\\u7684 experimental compiler\\u3002\\u5982\\u679c\\u60a8\\u8ba4\\u4e3a\\u60a8\\u9047\\u5230\\u4e86\\u7f16\\u8bd1\\u5668\\u76f8\\u5173\\u7684\\u95ee\\u9898\\uff0c\\u8bf7\\u5411\\u6211\\u4eec\\u53cd\\u9988<\\/p>\"],\"rust\":[\"Rust\",\"<p>\\u7248\\u672c\\uff1a<code>rust 1.79.0<\\/code><\\/p>\\r\\n\\r\\n<p>\\u652f\\u6301 crates.io \\u7684 <a href=\\\"https:\\/\\/crates.io\\/crates\\/rand\\\" target=\\\"_blank\\\">rand<\\/a> \\u548c <a href=\\\"https:\\/\\/crates.io\\/crates\\/regex\\\" target=\\\"_blank\\\">regex<\\/a><\\/p>\"],\"php\":[\"PHP\",\"<p><code>PHP 8.2<\\/code>.<\\/p>\\r\\n\\r\\n<p>With bcmath module.<\\/p>\"],\"typescript\":[\"TypeScript\",\"<p>TypeScript 5.1.6<\\/p>\\r\\n\\r\\n<p>Compile Options: --alwaysStrict --strictBindCallApply --strictFunctionTypes --target ES2022<\\/p>\\r\\n\\r\\n<p><a href=\\\"https:\\/\\/lodash.com\\\" target=\\\"_blank\\\">lodash.js<\\/a> \\u5e93\\u5df2\\u7ecf\\u9ed8\\u8ba4\\u88ab\\u5305\\u542b\\u3002<\\/p>\\r\\n\\r\\n<p> \\u5982\\u9700\\u4f7f\\u7528\\u961f\\u5217\\/\\u4f18\\u5148\\u961f\\u5217\\uff0c\\u60a8\\u53ef\\u4f7f\\u7528 <a href=\\\"https:\\/\\/github.com\\/datastructures-js\\/priority-queue\\/blob\\/v5\\/README.md\\\" target=\\\"_blank\\\"> datastructures-js\\/priority-queue@5.4.0<\\/a>\\uff0c<a href=\\\"https:\\/\\/github.com\\/datastructures-js\\/queue\\/tree\\/v4.2.3\\\" target=\\\"_blank\\\"> datastructures-js\\/queue@4.2.3<\\/a> \\u4ee5\\u53ca <a href=\\\"https:\\/\\/github.com\\/datastructures-js\\/deque\\/tree\\/v1.0.4\\\" target=\\\"_blank\\\"> datastructures-js\\/deque@1.0.4<\\/a>\\u3002<\\/p>\"],\"racket\":[\"Racket\",\"<p><a href=\\\"https:\\/\\/docs.racket-lang.org\\/guide\\/performance.html#%28tech._c%29\\\" target=\\\"_blank\\\">Racket CS<\\/a> v8.11<\\/p>\\r\\n\\r\\n<p>\\u4f7f\\u7528 #lang racket<\\/p>\\r\\n\\r\\n<p>\\u5df2\\u9884\\u5148 (require data\\/gvector data\\/queue data\\/order data\\/heap). \\u82e5\\u9700\\u4f7f\\u7528\\u5176\\u5b83\\u6570\\u636e\\u7ed3\\u6784\\uff0c\\u53ef\\u81ea\\u884c require\\u3002<\\/p>\"],\"erlang\":[\"Erlang\",\"Erlang\\/OTP 26\"],\"elixir\":[\"Elixir\",\"Elixir 1.16 with Erlang\\/OTP 26\"],\"dart\":[\"Dart\",\"<p>Dart 3.2\\u3002\\u60a8\\u53ef\\u4ee5\\u4f7f\\u7528 <a href=\\\"https:\\/\\/pub.dev\\/packages\\/collection\\/versions\\/1.18.0\\\" target=\\\"_blank\\\">collection<\\/a> \\u5305<\\/p>\\r\\n\\r\\n<p>\\u60a8\\u7684\\u4ee3\\u7801\\u5c06\\u4f1a\\u88ab\\u4e0d\\u7f16\\u8bd1\\u76f4\\u63a5\\u8fd0\\u884c<\\/p>\"],\"cangjie\":[\"Cangjie\",\"<p>\\u7248\\u672c\\uff1a0.53.11 (cjnative)<\\/p>\\r\\n\\r\\n<p>\\u7f16\\u8bd1\\u53c2\\u6570\\uff1a<code>-O2 --disable-reflection<\\/code><\\/p>\\r\\n\\r\\n<p>\\u5feb\\u901f\\u5165\\u95e8\\u8bf7\\u67e5\\u9605<a href=\\\"https:\\/\\/leetcode.cn\\/leetbook\\/detail\\/cangjie\\/\\\" target=\\\"_blank\\\">\\u300c\\u4ed3\\u9889\\u7f16\\u7a0b\\u8bed\\u8a00\\u5f00\\u53d1\\u6307\\u5357\\u300d<\\/a><\\/p>\"]}",
            "enableRunCode": true,
            "hasFrontendPreview": false,
            "frontendPreviews": "{}"
        }
    }
}
```




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